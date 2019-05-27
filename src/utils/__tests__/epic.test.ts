import { ActionsObservable, StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { createAsyncAction } from "typesafe-actions";
import { RootAction } from "typesafe-actions/dist/create-reducer";
import { Services } from "../../services";
import { createSimpleEpic } from "../epic";

const middlewareTask = jest.fn();
const callbacks = {
  success: jest.fn(),
  failure: jest.fn(),
};

const asyncAction = createAsyncAction("REQUEST", "SUCCESS", "FAILURE")<
  {},
  {},
  {}
>();

describe("createSimpleEpic", () => {
  const simpleEpic = createSimpleEpic(asyncAction, middlewareTask, callbacks);
  const state$ = new StateObservable(new Subject(), {});
  const dependencies: Services = {
    Api: {
      fetchFormula: jest.fn(),
    },
  };
  beforeEach(() => {
    middlewareTask.mockClear();
    callbacks.success.mockClear();
    callbacks.failure.mockClear();
    // @ts-ignore
    dependencies.Api.fetchFormula.mockClear();
  });

  it("should run with success", async () => {
    middlewareTask.mockResolvedValueOnce("RESULT");

    const action$ = ActionsObservable.of(asyncAction.request({}) as RootAction);
    const output$ = simpleEpic(action$, state$, dependencies);
    const result = await output$.toPromise();

    expect(asyncAction.success("RESULT")).toEqual(result);
    expect(callbacks.success).toHaveBeenCalledTimes(1);
    expect(callbacks.success).toHaveBeenCalledWith("RESULT");
  });

  it("should run with failure", async () => {
    middlewareTask.mockRejectedValueOnce("ERROR");

    const action$ = ActionsObservable.of(asyncAction.request({}) as RootAction);
    const output$ = simpleEpic(action$, state$, dependencies);
    const result = await output$.toPromise();

    expect(asyncAction.failure("ERROR")).toEqual(result);
    expect(callbacks.failure).toHaveBeenCalledTimes(1);
    expect(callbacks.failure).toHaveBeenCalledWith("ERROR");
  });
});
