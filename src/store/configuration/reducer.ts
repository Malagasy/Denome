import { Sign, ConfigurationActions } from "./action";
import { createReducer, ActionType } from "typesafe-actions";

export interface ConfigurationState {
  numberOfTerms: number;
  signs: Sign[];
}

const initialState: ConfigurationState = {
  numberOfTerms: 2,
  signs: [],
};

export const configurationReducer = createReducer<
  ConfigurationState,
  ActionType<typeof ConfigurationActions>
>(initialState)
  .handleAction(ConfigurationActions.setSigns, (state, action) => ({
    ...state,
    signs: action.payload.signs,
  }))
  .handleAction(ConfigurationActions.setNumberOfTerms, (state, action) => ({
    ...state,
    numberOfTerms: action.payload.numberOfTerms,
  }));
