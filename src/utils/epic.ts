import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, mergeMap } from "rxjs/operators";
import { Action, ActionCreator, isActionOf } from "typesafe-actions";
import { RootAction } from "../store";
import { PlayActions } from "../store/play/action";
import { Services } from "./../services/index";

interface EpicCallback<S, F> {
  success?: (result: S) => null | undefined | RootAction | RootAction[];
  failure?: (error: F) => null | undefined | RootAction | RootAction[];
}

export const createSimpleEpic = <V extends string, RootState, S, F>(
  actionToObserve: ActionCreator<V>,
  middlewareTask: (
    observedAction: Action<V>,
    state$: RootState,
    dependencies: Services
  ) => Promise<S>,
  callback?: EpicCallback<S, F>
): Epic<RootAction, RootAction, RootState, Services> => {
  return (action$, state$, dependencies) =>
    action$.pipe(
      filter(isActionOf(actionToObserve)),
      mergeMap(observedAction =>
        from(middlewareTask(observedAction, state$.value, dependencies)).pipe(
          mergeMap(result => {
            let successActions: RootAction[] = [];
            const cbResult =
              callback && callback.success && callback.success(result);
            if (cbResult) {
              if (Array.isArray(cbResult)) {
                successActions = cbResult;
              } else {
                successActions = [cbResult];
              }
            }
            return of(PlayActions.fetchFormula.success({}), ...successActions);
          }),
          catchError(error => {
            let failureActions: RootAction[] = [];
            const cbResult =
              callback && callback.failure && callback.failure(error);
            if (cbResult) {
              if (Array.isArray(cbResult)) {
                failureActions = cbResult;
              } else {
                failureActions = [cbResult];
              }
            }
            return of(PlayActions.fetchFormula.failure({}), ...failureActions);
          })
        )
      )
    );
};
