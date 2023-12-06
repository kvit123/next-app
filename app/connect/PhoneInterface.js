import React, { useState, useEffect } from 'react';

export default function PhoneInterface() {
    // const [callStatus, setCallStatus] = useState('idle'); // 'idle', 'calling', 'connected', 'on-hold'
    // const [isCallActive, setIsCallActive] = useState(false); // To track if the call is active
    // const [showKeypad, setShowKeypad] = useState(false); // To toggle keypad display
    // const [inputNumber, setInputNumber] = useState(''); // To display clicked number

    // Maintaining the state of inputs and other UI elements across browser refreshes or re-openings

    const [isCallActive, setIsCallActive] = useState(false); 
    const [showKeypad, setShowKeypad] = useState(false); 

    // Initialize state with empty default values
    const [callStatus, setCallStatus] = useState('idle');
    const [inputNumber, setInputNumber] = useState('');

    const [agentName, setAgentName] = useState('');
    const [agentStatus, setAgentStatus] = useState('');
    const [agentStatusList, setAgentStatusList] = useState([]);

    const [statusTimes, setStatusTimes] = useState({});
    const [lastStatusChangeTime, setLastStatusChangeTime] = useState(Date.now());
    

    useEffect(() => {
        // Check if window is defined (i.e., if in the browser/client environment)
        if (typeof window !== 'undefined') {
            // Get stored values from localStorage, if they exist
            const storedCallStatus = localStorage.getItem('callStatus') || 'idle';
            const storedInputNumber = localStorage.getItem('inputNumber') || '';
            
            setCallStatus(storedCallStatus);
            setInputNumber(storedInputNumber);
        }
    }, []);

    useEffect(() => {
        // Check if the Amazon Connect Streams API is loaded
        if (typeof window.connect !== 'undefined') {
            window.connect.agent((agent) => {
                // Fetch and set the agent's name
                setAgentName(agent.getName());
            });
        }
    }, []);
    
    // useEffect(() => {
    //     if (typeof window.connect !== 'undefined') {
    //         window.connect.agent((agent) => {
    //             const routingProfile = agent.getRoutingProfile();
    //             const availableStates = routingProfile.states.map(state => ({
    //                 name: state.name,
    //                 type: state.type
    //             }));
    //             setAgentStatusList(availableStates);
    //         });
    //     }
    // }, []);
    



    useEffect(() => {
        if (typeof window.connect !== 'undefined') {
            window.connect.agent((agent) => {
                // Update the status whenever there's a change
                agent.onStateChange((state) => {
                    setAgentStatus(state.newState);
                });
    
                // Set the initial status
                setAgentStatus(agent.getState().name);
            });
        }
    }, []);

    // const setAgentAvailable = () => {
    //     const routingProfile = new window.connect.RoutingProfile();
    //     const queueARNs = []; // Replace with your queue ARNs
    //     const initialState = window.connect.AgentStateType.ROUTABLE;
    
    //     window.connect.agent((agent) => {
    //         agent.setState(initialState, {
    //             success: () => {
    //                 console.log("Agent set to available");
    //             },
    //             failure: () => {
    //                 console.error("Failed to set agent to available");
    //             }
    //         });
    //     });
    // };


    // Agent Time status
    // useEffect(() => {
    //     if (typeof window.connect !== 'undefined') {
    //         window.connect.agent((agent) => {
    //             agent.onStateChange((state) => {
    //                 const newStatus = state.newState;
    //                 const currentTime = Date.now();
    //                 const previousStatus = agent.getState().name;
    //                 const duration = currentTime - lastStatusChangeTime;
    
    //                 setStatusTimes(prevStatusTimes => ({
    //                     ...prevStatusTimes,
    //                     [previousStatus]: (prevStatusTimes[previousStatus] || 0) + duration
    //                 }));
    
    //                 setLastStatusChangeTime(currentTime);
    //                 setAgentStatus(newStatus);
    //             });
    
    //             // Set the initial status and time
    //             setAgentStatus(agent.getState().name);
    //             setLastStatusChangeTime(Date.now());
    //         });
    //     }
    // }, []);
    

    useEffect(() => {
        // Again, check if window is defined
        if (typeof window !== 'undefined') {
            // Save to localStorage
            localStorage.setItem('callStatus', callStatus);
            localStorage.setItem('inputNumber', inputNumber);
        }
    }, [callStatus, inputNumber]);
    // End Maintaining the state of inputs and other UI elements across browser refreshes or re-openings

    const handleCall = () => {
        if (inputNumber) {
            // Start the call and set status to connecting
            setCallStatus('connecting');
        // Start the call using Amazon Connect Streams API
            const endpoint = window.connect.Endpoint.byPhoneNumber(inputNumber);
            window.connect.agent((agent) => {
                setShowKeypad(false);
                setIsCallActive(true); // Set the call as active
                agent.connect(endpoint, {
                    success: () => {
                        console.log("Call initiated successfully");
                        setCallStatus('connected');
                        setIsCallActive(true);
                    },
                    failure: () => {
                        console.error("Call failed to initiate");
                        setCallStatus('idle');
                    }
                });
            });
            // // Simulate a delay for connecting the call
            // setTimeout(() => {
            //     // Simulate receiving a connected event
            //     setCallStatus('connected');
            // }, 3000); // 3 seconds delay
        } else {
            console.log("Please enter a number to call");
        }
    };

    // const handleHangup = () => {
    //     // Implement hangup functionality
    //     // End the call using Amazon Connect Streams API
    //     window.connect.contact((contact) => {
    //         if (contact) {
    //             contact.getAgentConnection().destroy({
    //                 success: () => {
    //                     console.log("Call ended successfully");
    //                     setCallStatus('idle');
    //                     setIsCallActive(false); // Set the call as inactive
    //                     setInputNumber(''); // Reset the input number
    //                 },
    //                 failure: () => {
    //                     console.error("Failed to end the call");
    //                 }
    //             });
    //         }
    //     });
    // };

    const handleHangup = () => {
        console.log("Attempting to hang up the call...");
        window.connect.agent((agent) => {
            const contacts = agent.getContacts(window.connect.ContactType.VOICE);
            console.log("Contact:", contacts);
            if (contacts && contacts.length > 0) {
                const activeContact = contacts[0];
                activeContact.getAgentConnection().destroy({
                    success: () => {
                        console.log("Call ended successfully");
                        setCallStatus('idle');
                        setIsCallActive(false);
                        setInputNumber(''); // Reset the input number
                    },
                    failure: (e) => {
                        console.error("Failed to end the call", e);
                    }
                });
            } else {
                console.error("No active voice contact found");
            }
        });
    };
    
    

    const handleResumeCall = () => {
        // Define the additional functionality for resuming the call
        window.connect.agent((agent) => {
            const contacts = agent.getContacts(window.connect.ContactType.VOICE);
            if (contacts && contacts.length > 0) {
                const activeContact = contacts[0];
                const connection = activeContact.getActiveInitialConnection();
                if (connection && callStatus === 'on-hold') {
                    connection.resume({
                        success: () => {
                            console.log("Call resumed successfully");
                            setCallStatus('connected');
                        },
                        failure: () => {
                            console.error("Failed to resume the call");
                        }
                    });
                }
            } else {
                console.error("No active voice contact found");
            }
        });

        // console.log("Resuming call...");
        // setCallStatus('connected');
        // Additional logic for resuming the call goes here
    };

    const handlePutOnHold = () => {
        // Implement on hold functionality
        window.connect.agent((agent) => {
            const contacts = agent.getContacts(window.connect.ContactType.VOICE);
            if (contacts && contacts.length > 0) {
                const activeContact = contacts[0];
                const connection = activeContact.getActiveInitialConnection();
                if (connection && callStatus !== 'on-hold') {
                    connection.hold({
                        success: () => {
                            console.log("Call put on hold successfully");
                            setCallStatus('on-hold');
                        },
                        failure: () => {
                            console.error("Failed to put the call on hold");
                        }
                    });
                }
            } else {
                console.error("No active voice contact found");
            }
        });

        // if (callStatus === 'on-hold') {
        //     handleResume();
        // }
        // setCallStatus(callStatus === 'on-hold' ? 'connected' : 'on-hold');
    };

    const handleCloseContact = () => {
        window.connect.agent((agent) => {
            const contacts = agent.getContacts(window.connect.ContactType.VOICE);
            if (contacts && contacts.length > 0) {
                const activeContact = contacts[0];
                if (activeContact) {
                    activeContact.complete({
                        success: () => {
                            console.log("Contact closed successfully");
                            setCallStatus('idle');
                            setIsCallActive(false);
                            setInputNumber(''); // Reset the input number
                        },
                        failure: () => {
                            console.error("Failed to close the contact");
                        }
                    });
                }
            } else {
                console.error("No active voice contact found");
            }
        });
    };
    

    const toggleKeypad = () => {
        setShowKeypad(!showKeypad);
    };

    const handleNumberClick = (number) => {
        setInputNumber(inputNumber + number);
    };

    const handleDelete = () => {
        setInputNumber(inputNumber.slice(0, -1));
    };

    // const handleStatusChange = (event) => {
    //     const selectedStatusType = event.target.value;
    //     window.connect.agent((agent) => {
    //         const newState = agent.getAgentStates().find(state => state.type === selectedStatusType);
    //         if (newState) {
    //             agent.setState(newState, {
    //                 success: () => {
    //                     console.log(`Agent status changed to ${newState.name}`);
    //                 },
    //                 failure: () => {
    //                     console.error("Failed to change agent status");
    //                 }
    //             });
    //         }
    //     });
    // };

    //Display time status
    // const formatDuration = (milliseconds) => {
    //     const seconds = Math.floor(milliseconds / 1000);
    //     const minutes = Math.floor(seconds / 60);
    //     const hours = Math.floor(minutes / 60);
    
    //     const hoursPart = hours > 0 ? `${hours}h ` : '';
    //     const minutesPart = minutes > 0 ? `${minutes % 60}m ` : '';
    //     const secondsPart = `${seconds % 60}s`;
    
    //     return `${hoursPart}${minutesPart}${secondsPart}`;
    // };

    return (
        <div className="relative min-w-[25%] bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">

            {/* Display Agent's Name */}
            <div>
                <p>Agent Name: {agentName}</p>
            </div>

            {/* Display Input Number */}
            <div>
                <p>Number: {inputNumber}</p>
            </div>

            {/* Call Status Display */}
            <div>
                <p>Call Status: {callStatus}</p>
            </div>


            {/* Display Agent's Status */}
            <div>
                <p>Agent Status: {agentStatus}</p>
            </div>

            {/* Display Agent's Time Status */}
            <div>
                <h3>Status Durations</h3>
                {Object.keys(statusTimes).map((status) => (
                    <p key={status}>{status}: {formatDuration(statusTimes[status])}</p>
                ))}
            </div>
            {/* Button to Set Agent to Available
            <button onClick={setAgentAvailable} className="btn p-4 rounded shadow">
                Set to Available
            </button> */}

            {/* <div>
                <select onChange={handleStatusChange} value={agentStatus}>
                    {agentStatusList.map((status, index) => (
                        <option key={index} value={status.type}>
                            {status.name}
                        </option>
                    ))}
                </select>
            </div> */}

            {/* Text input for number */}
            <input
                type="text"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                className="mb-4 p-2 border rounded"
                placeholder="Enter number"
            />


            {/* Function buttons */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                 <button 
                    onClick={handleCall} 
                    className={`btn p-4 rounded shadow ${callStatus === 'connecting' ? 'bg-gray-400' : (isCallActive ? 'bg-gray-400' : 'bg-gray-200')}`}>
                    {callStatus === 'connecting' ? 'Connecting...' : (isCallActive ? 'Connected' : 'Call')}
                </button>

                <button onClick={handleHangup} className="btn p-4 rounded shadow">Hangup</button>
                {/* {(callStatus === 'connected' || callStatus === 'on-hold') && (
                    // <button 
                    //     onClick={handleHold} 
                    //     className={`btn p-4 rounded shadow ${callStatus === 'on-hold' ? 'bg-gray-400' : 'bg-gray-200'}`}>
                    //     {callStatus === 'on-hold' ? 'Resume' : 'Hold'}
                    // </button>
                    
                )} */}
                <button onClick={handlePutOnHold} disabled={callStatus !== 'connected'} className="btn p-4 rounded shadow">
                    Hold
                </button>
                <button onClick={handleResumeCall} disabled={callStatus !== 'on-hold'} className="btn p-4 rounded shadow">
                    Resume
                </button>
                <button onClick={handleCloseContact} disabled={!isCallActive} className="btn p-4 rounded shadow">
                    Close Contact
                </button>
            </div>

            {/* Keypad Toggle Button */}
            <button onClick={toggleKeypad} className="btn p-4 rounded shadow mb-4">
            {showKeypad ? 'Hide Keypad' : 'Show Keypad'}
            </button>

            {/* Number pad and Delete Button */}
            {showKeypad && (
                <div className='flex justify-around'>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((number) => (
                            <button 
                                key={number} 
                                onClick={() => handleNumberClick(number)}
                                className="btn p-4 rounded shadow">
                                {number}
                            </button>
                        ))}
                    </div>

                    <button onClick={handleDelete} className="btn p-4 rounded shadow">
                        Delete
                    </button>
                </div>
            )}

        </div>
    );
}
