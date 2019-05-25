import { ActionType, createAsyncAction } from "typesafe-actions";

export const PlayActions = {
  fetchFormula: createAsyncAction(
    "FETCH_FORMULA_REQUEST",
    "FETCH_FORMULA_SUCCESS",
    "FETCH_FORMULA_FAILURE"
  )<{}, {}, {}>(),
};

export type PlayAction = ActionType<typeof PlayActions>;
