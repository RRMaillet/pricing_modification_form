import { createReducer } from '@reduxjs/toolkit';
import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
	currentUser     : null,
	authToken       : null,
	roles           : null,
	isAuthenticated : false,
	tm              : [],
	customers       : [],
	userEmail       : null,
	managerEmail    : null,
	maxApproval     : null,
	MgrMaxApproval  : null,
	dept_code       : null
};

export const userReducer = createReducer(INITIAL_STATE, (builder) => {
	builder
		.addCase(USER_ACTION_TYPES.SET_CURRENT_USER, (state, action) => {
			return { ...state, currentUser: action.payload };
		})
		.addCase(USER_ACTION_TYPES.SET_AUTHTOKEN_USER, (state, action) => {
			state.authToken = action.payload;
		})
		.addCase(USER_ACTION_TYPES.SET_ROLES_USER, (state, action) => {
			state.roles = action.payload;
		})
		.addCase(USER_ACTION_TYPES.SET_CUSTOMERS, (state, action) => {
			return {
				...state,
				userEmail   : action.payload[0].Email,
				maxApproval : action.payload[0].TM_Max_Approval,
				dept_code   : action.payload[0].Dept_Code
			};
		})
		.addCase(USER_ACTION_TYPES.SET_ACCTS_USER, (state, action) => {
			return {
				...state,
				tm : action.payload
			};
		})
		.addCase(USER_ACTION_TYPES.SET_CUST_USER, (state, action) => {
			return {
				...state,
				customers : action.payload
			};
		})
		.addDefaultCase((state, action) => {});
});
