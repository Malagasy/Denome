import { connectRouter, routerMiddleware } from "connected-react-router";
import { createMemoryHistory } from "history";
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore as createStoreRedux,
} from "redux";
import { configurationReducer } from "./configuration/reducer";
import { createLogger } from "redux-logger";

const createRootReducer = (history: ReturnType<typeof createMemoryHistory>) =>
  combineReducers({
    configuration: configurationReducer,
    router: connectRouter(history),
  });

export const history = createMemoryHistory();

const createStore = (history: ReturnType<typeof createMemoryHistory>) =>
  createStoreRedux(
    createRootReducer(history),
    undefined,
    compose(applyMiddleware(routerMiddleware(history), createLogger()))
  );

export const store = createStore(history);

export type AppState = ReturnType<ReturnType<typeof createRootReducer>>;
