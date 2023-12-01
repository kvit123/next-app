import React, { useState } from 'react';

export default function PhoneInterface() {
    const [callStatus, setCallStatus] = useState('idle'); // 'idle', 'calling', 'connected', 'on-hold'
    const [isCallActive, setIsCallActive] = useState(false); // To track if the call is active
    const [showKeypad, setShowKeypad] = useState(false); // To toggle keypad display
    const [inputNumber, setInputNumber] = useState(''); // To display clicked number

    const handleCall = () => {
        if (inputNumber) {
            // Start the call and set status to connecting
            setCallStatus('connecting');
            setShowKeypad(false);
            setIsCallActive(true); // Set the call as active

            // Simulate a delay for connecting the call
            setTimeout(() => {
                // Simulate receiving a connected event
                setCallStatus('connected');
            }, 3000); // 3 seconds delay
        } else {
            console.log("Please enter a number to call");
        }
    };

    const handleHangup = () => {
        // Implement hangup functionality
        setCallStatus('idle');
        setIsCallActive(false); // Set the call as inactive
        setInputNumber(''); // Reset the input number
    };

    const handleResume = () => {
        // Define the additional functionality for resuming the call
        console.log("Resuming call...");
        setCallStatus('connected');
        // Additional logic for resuming the call goes here
    };

    const handleHold = () => {
        // Implement on hold functionality
        if (callStatus === 'on-hold') {
            handleResume();
        }
        setCallStatus(callStatus === 'on-hold' ? 'connected' : 'on-hold');
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

    return (
        <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            {/* Display Input Number */}
            <div>
                <p>Number: {inputNumber}</p>
            </div>

            {/* Call Status Display */}
            <div>
                <p>Call Status: {callStatus}</p>
            </div>

            {/* Text input for number */}
            {/* <input
                type="text"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                className="mb-4 p-2 border rounded"
                placeholder="Enter number"
            /> */}


            {/* Function buttons */}
            <div className="flex justify-around mb-4">
                 <button 
                    onClick={handleCall} 
                    className={`btn p-4 rounded shadow ${callStatus === 'connecting' ? 'bg-gray-400' : (isCallActive ? 'bg-gray-400' : 'bg-gray-200')}`}>
                    {callStatus === 'connecting' ? 'Connecting...' : (isCallActive ? 'Connected' : 'Call')}
                </button>

                <button onClick={handleHangup} className="btn p-4 rounded shadow">Hangup</button>
                {(callStatus === 'connected' || callStatus === 'on-hold') && (
                    <button 
                        onClick={handleHold} 
                        className={`btn p-4 rounded shadow ${callStatus === 'on-hold' ? 'bg-gray-400' : 'bg-gray-200'}`}>
                        {callStatus === 'on-hold' ? 'Resume' : 'Hold'}
                    </button>
                )}
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
