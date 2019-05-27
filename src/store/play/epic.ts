import { createSimpleEpic } from "./../../utils/epic";
import { PlayActions } from "./action";

export const fetchFormulaEpic = createSimpleEpic(
  PlayActions.fetchFormula,
  async (action, state$, { Api }) => {
    return await Api.fetchFormula();
  },
  {
    success: () => {
      return null;
    },
  }
);

export default [fetchFormulaEpic];
