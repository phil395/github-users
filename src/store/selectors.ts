import { createDraftSafeSelector } from "@reduxjs/toolkit";
// types
import type { IParserSlice } from "./slices/parserSlice";
import type { IAchievement } from "@models/achievement";
import { RootState } from "./store";

// status selectors

const selectApiStatus = (state: RootState) => state.api.status;

const selectParserStatus = (state: RootState) => state.parser.status;

export const selectAchievementsData = (state: RootState) => {
  const { parser } = state;
  return [parser.data?.achievements, parser.status] as readonly [
    IAchievement[] | undefined,
    IParserSlice["status"]
  ];
};

export const isLoadingSelector = createDraftSafeSelector(
  selectApiStatus,
  selectParserStatus,
  (apiStatus, parserStatus) =>
    apiStatus === "pending" || parserStatus === "pending" ? true : false
);


export const selectToastifyMsg = (state: RootState) => state.toasts.messages;
