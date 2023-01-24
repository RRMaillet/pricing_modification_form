import { createAction } from "@reduxjs/toolkit";
import { PRICING_ACTION_TYPES } from "./pricing.types";


export const addPricingMod = createAction(PRICING_ACTION_TYPES.ADD_PRICING_MOD);
export const deletePricingMod = createAction(PRICING_ACTION_TYPES.DELETE_PRICING_MOD);
export const updatePricingMod = createAction(PRICING_ACTION_TYPES.UPDATE_PRICING_MOD);
export const resetPricingMod = createAction(PRICING_ACTION_TYPES.RESET_PRICING_MOD);
export const setCustomerPricingMod = createAction(PRICING_ACTION_TYPES.SET_CUSTOMER_PRICING_MOD);
export const showAlertPricing = createAction(PRICING_ACTION_TYPES.SHOW_ALERT_PRICING_MOD);
