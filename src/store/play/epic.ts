import { createSimpleEpic } from "./../../utils/epic";
import { PlayActions } from "./action";

export const fetchFormulaEpic = createSimpleEpic(
  PlayActions.fetchFormula.request,
  async (action, state$, { Api }) => {
    return await Api.fetchFormula();
  },
  {
    success: result => {
      console.log(result);
      return null;
    },
  }
);

export default [fetchFormulaEpic];
