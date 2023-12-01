import React, { useContext, useState } from 'react';
const AmazonConnectContext = React.createContext(null);

export function useAmazonConnectProvider() {
    const state = useContext(AmazonConnectContext);

    if (!state) {
        throw new Error('useAmazonConnectProvider must be used within AmazonConnectProvider');
    }

    return state;
}

export function AmazonConnectProvider({children}) {

    const [initialContactId, setInitialContactId] = useState(null);
    const [contactId, setContactId] = useState(null);
    const [agentChatSession, setAgentChatSession] = useState(null);
    const [contactState, setContactState] = useState(null);
    const [contactAttributes, setContactAttributes] = useState({});
    const [contactType, setContactType] = useState(null);

    const subscribeToEvents = () => {
        const connect = window.connect;
        if (connect.core.initialized) {
            console.info(`AmazonConnectProvider >> Subscribing to Connect Events`);
            connect.contact(contact => {
                contact.onIncoming(contact => {
                    console.info(`AmazonConnectProvider >> onIncoming() >> contactId = ${contact.contactId}`);
                    setContactState(connect.ContactStateType.INCOMING);
                });

                contact.onConnecting(contact => {
                    console.info(`AmazonConnectProvider >> onConnecting() >> contactId = ${contact.contactId}`);
                    setContactId(contact.contactId);
                    setInitialContactId(contact.getOriginalContactId());
                    setContactType(contact.getType());
                    setContactState(connect.ContactStateType.CONNECTING);
                    setContactAttributes(contact.getAttributes());
                });

                contact.onRefresh(contact => {
                    console.info(`AmazonConnectProvider >> onRefresh() >> contactId = ${contact.contactId}`);
                    setContactId(contact.contactId);
                    setInitialContactId(contact.getOriginalContactId());
                    setContactType(contact.getType());
                    setContactAttributes(contact.getAttributes());
                });

                contact.onConnected(contact => {
                    console.info(`AmazonConnectProvider >> onConnected() >> contactId = ${contact.contactId}`);
                    setContactId(contact.contactId);
                    setInitialContactId(contact.getOriginalContactId());
                    setContactType(contact.getType());
                    setContactState(connect.ContactStateType.CONNECTED);
                    setContactAttributes(contact.getAttributes());
                    if (contact.getType() === "chat") {
                        contact.getAgentConnection().getMediaController().then((controller) => {
                            // Note: This isn't used in the bae custom demo, but it shows you how to access the agent
                            // session for chat contacts if you want to expand the agent app to use custom chat functionality
                            console.info(`AmazonConnectProvider >> Media Controller`);
                            setAgentChatSession(controller);
                        })
                    }
                })

                contact.onACW(contact => {
                    console.info(`AmazonConnectProvider >> onACW() >> contactId = ${contact.contactId}`);
                    setContactId(contact.contactId);
                    setContactState('ACW');
                })

                contact.onDestroy(contact => {
                    console.info(`AmazonConnectProvider >> onDestroy() >> contactId = ${contact.contactId}`);
                    setContactId(null);
                    setInitialContactId(null);
                    setContactType(null);
                    setContactState(contact.getState().type);
                    clearState();
                })

                contact.onMissed(contact => {
                    console.info(`AmazonConnectProvider >> onMissed() >> contactId = ${contact.contactId}`);
                    setContactId(contact.contactId);
                    setContactState(window.connect.ContactStateType.MISSED);
                })

                contact.onError(contact => {
                    console.info(`AmazonConnectProvider >> onError() >> contactId = ${contact.contactId}`);
                    setContactId(contact.contactId);
                    setContactState(window.connect.ContactStateType.ERROR);
                    clearState();
                })
            })
        }
        else{
            setTimeout(() => { subscribeToEvents(); }, 3000);
        }
    }

    const clearState = () => {
        try{
            setAgentChatSession(null);
            setContactAttributes({});
            setContactType(null);
        }
        catch(error){
            console.error(`AmazonConnectProvider`,error);
        }
    }


    const providerValue = {
        initialContactId,
        contactId,
        agentChatSession,
        contactState,
        contactAttributes,
        contactType,
        subscribeToEvents,
    };
    return (
        <AmazonConnectContext.Provider value={providerValue}>
            {children}
        </AmazonConnectContext.Provider>
    );
}
