import { combineReducers } from "@reduxjs/toolkit";

import {userReducer} from './user/user.reducer'
import { pricingReducer } from "./pricing/pricing.reducer";
import { tiersReducer } from "./tiers/tiers.reducer";
import { alertReducer } from "./alerts/alerts.reducer";
import { customersReducer } from "./customers/customers.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    pricing: pricingReducer,
    tiers: tiersReducer,
    alerts: alertReducer,
    customers: customersReducer
});