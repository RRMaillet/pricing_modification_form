import { createReducer } from "@reduxjs/toolkit";
import { TIERS_ACTION_TYPES } from "./tiers.types";

const INITIAL_STATE = [
  {
    tier_no: "0",
    props: {
      desc: "No Discount",
    },
  },
  {
    tier_no: "1",
    props: {
      desc: "MGR1",
    },
  },
  {
    tier_no: "2",
    props: {
      desc: "MGR2",
    },
  },
  {
    tier_no: "3",
    props: {
      desc: "MGR3",
    },
  },
  {
    tier_no: "4",
    props: {
      desc: "TM1",
    },
  },
  {
    tier_no: "5",
    props: {
      desc: "TM2",
    },
  },
  {
    tier_no: "6",
    props: {
      desc: "TM3",
    },
  },
  {
    tier_no: "7",
    props: {
      desc: "TM4",
    },
  },
  {
    tier_no: "8",
    props: {
      desc: "TM5",
    },
  },
  {
    tier_no: "9",
    props: {
      desc: "TM6",
    },
  },
];

export const tiersReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(TIERS_ACTION_TYPES.ADD_TIERS, (state, action) => {})
    .addDefaultCase((state, action) => {});
});
