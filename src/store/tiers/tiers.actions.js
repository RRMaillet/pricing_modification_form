import { createAction } from "@reduxjs/toolkit";
import { TIERS_ACTION_TYPES } from "./tiers.types";


export const addTiersMod = createAction(TIERS_ACTION_TYPES.ADD_TIERS);
