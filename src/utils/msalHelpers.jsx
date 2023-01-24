import * as msal from '@azure/msal-browser';
import { msalConfig } from '../authConfig';

const msalInstance = new msal.PublicClientApplication(msalConfig);

export const currentUser = msalInstance.getActiveAccount();
