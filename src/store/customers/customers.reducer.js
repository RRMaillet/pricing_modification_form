import { createReducer } from '@reduxjs/toolkit';
import { CUSTOMERS_ACTION_TYPES } from './customers.types';

const INITIAL_STATE = [
	{
		customer : null,
		tm       : null,
		custData : []
	}
];

export const customersReducer = createReducer(INITIAL_STATE, (builder) => {
	builder
		.addCase(CUSTOMERS_ACTION_TYPES.CHANGE_CUSTOMER, (state, action) => {
			return { ...state, customer: action.payload };
		})
		.addCase(CUSTOMERS_ACTION_TYPES.CHANGE_TM, (state, action) => {
			return { ...state, tm: action.payload };
		})
		.addCase(CUSTOMERS_ACTION_TYPES.ADD_CUSTDATA, (state, action) => {
			return { ...state, custData: action.payload };
		})
		.addCase(CUSTOMERS_ACTION_TYPES.RESET_CUSTDATA, (state, action) => {
			return { ...state, custData: [], customer: null };
		})
		.addDefaultCase((state, action) => {});
});
