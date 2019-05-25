import { createAction } from "typesafe-actions";

export enum Sign {
  ADD = "+",
  SUBTRACT = "-",
  MULTIPLY = "*",
  DIVIDE = "/",
}

export const ConfigurationActions = {
  setSigns: createAction("SET_SIGNS", action => {
    return (signs: Sign[]) => action({ signs });
  }),
  setNumberOfTerms: createAction("SET_NUMBER_OF_TERMS", action => {
    return (numberOfTerms: number) => action({ numberOfTerms });
  }),
};
