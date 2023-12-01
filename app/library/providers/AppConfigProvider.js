import React, { useContext } from 'react';
import connectParams from '../../../config.connect.json'

const AppConfigContext = React.createContext(null);

export function useAppConfig(){
    const config = useContext(AppConfigContext);

    if(!config) throw new Error('useAppConfig must be used within AppConfigProvider');

    return config;
}

export function AppConfigProvider({children}) {

    const connectUrl = getParamValue(connectParams["/connectLoginUrl"]);
    const contactFlowId = getParamValue(connectParams["/contactFlowId"]);
    const customerAppApi = getParamValue(connectParams["/customerWebAppApi"]);
    const connectInstanceAlias = getParamValue(connectParams["/connectInstanceAlias"]);
    const connectInstanceId = getParamValue(connectParams["/connectInstanceId"]);
    const supportServiceApi = getParamValue(connectParams["/supportServiceAppApi"]);
    const sourcePhoneNumber = getParamValue(connectParams["/sourcePhoneNumber"]);

    const providerValue = {
        connectUrl,
        contactFlowId,
        customerAppApi,
        connectInstanceAlias,
        connectInstanceId,
        supportServiceApi,
        sourcePhoneNumber
    };

    return(
        <AppConfigContext.Provider value={providerValue}>
            {children}
        </AppConfigContext.Provider>
    );

}

function getParamValue(param){
    const SSM_NOT_DEFINED = 'not-defined'
    if(param === SSM_NOT_DEFINED) return undefined
    return param
}
