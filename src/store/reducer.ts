import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { configurationReducer } from "./configuration/reducer";
import { createMemoryHistory } from "history";

export const createRootReducer = (
  history: ReturnType<typeof createMemoryHistory>
) =>
  combineReducers({
    configuration: configurationReducer,
    router: connectRouter(history),
  });
