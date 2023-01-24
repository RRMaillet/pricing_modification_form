import { createReducer } from '@reduxjs/toolkit';
import { PRICING_ACTION_TYPES } from './pricing.types';

const INITIAL_STATE = []

export const pricingReducer = createReducer (INITIAL_STATE, (builder) => {
    builder
        .addCase(PRICING_ACTION_TYPES.ADD_PRICING_MOD, (state, action) => {
            
            if(state.some(pricing => pricing.No_ === action.payload.No_)) {
                return state
            } else {
            state.push(action.payload);
            }
            
        })
        .addCase(PRICING_ACTION_TYPES.DELETE_PRICING_MOD, (state, action) => {
            return state.filter(pricing => pricing.No_ !== action.payload)
        })
        .addCase(PRICING_ACTION_TYPES.UPDATE_PRICING_MOD, (state, action) => {
            //Find the existing Program No_

            //Update the values

            //Update State
        })
        .addCase(PRICING_ACTION_TYPES.RESET_PRICING_MOD, (state, action) => {
            return INITIAL_STATE;
        })
        .addCase(PRICING_ACTION_TYPES.SHOW_ALERT_PRICING_MOD, (state, action) => {
            return 
        })
        .addDefaultCase((state, action) => {})
});