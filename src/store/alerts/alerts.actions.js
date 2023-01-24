import { createAction } from "@reduxjs/toolkit";
import { ALERTS_ACTION_TYPES } from "./alerts.types";

export const showAlert = createAction(ALERTS_ACTION_TYPES.SHOW_ALERT);
export const hideAlert = createAction(ALERTS_ACTION_TYPES.HIDE_ALERT);
export const matchesAlert = createAction(ALERTS_ACTION_TYPES.MATCHES_TIER_ALERT);