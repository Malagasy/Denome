import { combineEpics } from "redux-observable";
import playEpics from "./play/epic";

export const rootEpic = combineEpics(...playEpics);
