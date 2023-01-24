import { createAction } from '@reduxjs/toolkit';
import { CUSTOMERS_ACTION_TYPES } from './customers.types';

export const changeCustomer = createAction(CUSTOMERS_ACTION_TYPES.CHANGE_CUSTOMER);
export const changeTM = createAction(CUSTOMERS_ACTION_TYPES.CHANGE_TM);
export const addCustData = createAction(CUSTOMERS_ACTION_TYPES.ADD_CUSTDATA);
export const resetCustData = createAction(CUSTOMERS_ACTION_TYPES.RESET_CUSTDATA);
