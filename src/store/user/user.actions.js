import { createAction } from '@reduxjs/toolkit';
import { USER_ACTION_TYPES } from './user.types';

export const setCurrentUser = createAction(USER_ACTION_TYPES.SET_CURRENT_USER);
export const setAuthToken = createAction(USER_ACTION_TYPES.SET_AUTHTOKEN_USER);
export const setRoles = createAction(USER_ACTION_TYPES.SET_ROLES_USER);
export const setCustomers = createAction(USER_ACTION_TYPES.SET_CUSTOMERS);
export const setAcctsUser = createAction(USER_ACTION_TYPES.SET_ACCTS_USER);
export const setCustUser = createAction(USER_ACTION_TYPES.SET_CUST_USER);
