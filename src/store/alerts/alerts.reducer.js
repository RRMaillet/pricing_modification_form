import { createReducer } from "@reduxjs/toolkit";
import { ALERTS_ACTION_TYPES } from "./alerts.types";

const INITIAL_STATE = [
    {
        status: false
    }
]

export const alertReducer = createReducer (INITIAL_STATE, (builder) => {
    builder
        .addCase(ALERTS_ACTION_TYPES.SHOW_ALERT, (state, action) => {
            return {...state, status: true , Message: `No changes made to ${action.payload}. Please verify and try again.` } 
        })
        .addCase(ALERTS_ACTION_TYPES.HIDE_ALERT, (state, action) => {
            return INITIAL_STATE
        })
        .addCase(ALERTS_ACTION_TYPES.MATCHES_TIER_ALERT, (state, action) => {
            state = INITIAL_STATE
            return {...state, status: true , Message: `New tier matches current tier selected for ${action.payload}. Please verify and try again.` } 
        })
        .addDefaultCase((state, action) => {})
});