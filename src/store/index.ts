import { Services } from "./../services/index";
import { routerMiddleware } from "connected-react-router";
import { createMemoryHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epic";
import { PlayAction } from "./play/action";
import { createRootReducer } from "./reducer";
import { services } from "../services";

export type RootAction = PlayAction;
export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

export const history = createMemoryHistory();

export const configureStore = () => {
  const epicMiddleware = createEpicMiddleware<
    RootAction,
    RootAction,
    RootState,
    Services
  >({
    dependencies: services,
  });
  const store = createStore(
    createRootReducer(history),
    undefined,
    compose(
      applyMiddleware(routerMiddleware(history), createLogger(), epicMiddleware)
    )
  );

  epicMiddleware.run(rootEpic);

  return store;
};

export type AppState = ReturnType<ReturnType<typeof createRootReducer>>;
