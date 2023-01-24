import { useMsal } from "@azure/msal-react";
import { useState } from 'react';
import { loginRequest } from '../authConfig'


function ProfileContent() {
    const { instance, accounts, inProgress } = useMsal();
    const [accessToken, setAccessToken] = useState(null);

    
        const request = {
            ...loginRequest,
            account: accounts[0]
        };
        
        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            (setAccessToken(response.accessToken));
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                setAccessToken(response.accessToken);
            });
        });
    
    return accessToken;

};

export default ProfileContent;