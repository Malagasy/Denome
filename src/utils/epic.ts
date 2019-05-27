import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, mergeMap } from "rxjs/operators";
import { isActionOf, TypeConstant } from "typesafe-actions";
import { AsyncActionCreator } from "typesafe-actions/dist/create-async-action";
import { RootAction } from "../store";
import { Services } from "./../services/index";

interface EpicCallback<S, F> {
  success?: (result: S) => null | undefined | RootAction | RootAction[];
  failure?: (error: F) => null | undefined | RootAction | RootAction[];
}

export const createSimpleEpic = <
  T1 extends [TypeConstant, any],
  T2 extends [TypeConstant, any],
  T3 extends [TypeConstant, any],
  RootState,
  S,
  F
>(
  actionsToObserve: AsyncActionCreator<T1, T2, T3>,
  middlewareTask: (
    action: typeof actionsToObserve.request,
    state$: RootState,
    dependencies: Services
  ) => Promise<S>,
  callback?: EpicCallback<S, F>
): Epic<RootAction, RootAction, RootState, Services> => {
  return (action$, state$, dependencies) =>
    action$.pipe(
      filter(isActionOf(actionsToObserve.request)),
      mergeMap(() =>
        from(
          middlewareTask(
            actionsToObserve.request as any,
            state$.value,
            dependencies
          )
        ).pipe(
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
            return of(
              actionsToObserve.success(result) as any,
              ...successActions
            );
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
            return of(
              actionsToObserve.failure(error) as any,
              ...failureActions
            );
          })
        )
      )
    );
};
