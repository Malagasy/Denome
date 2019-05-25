import { values } from "lodash";
import { Sign } from "../store/configuration/action";
import { OptionItem } from "../components/InputChoice";

export const isASign = (sign: string) => values(Sign).includes(sign);

export const convertManySignToOptions = (signs: Sign[]) =>
  signs.map(sign => ({ label: sign, value: sign }));

export const convertManyOptionToSigns = (options: OptionItem[]) => {
  const signsOrNull = options.map(option => {
    if (isASign(option.value)) {
      return option.value as Sign;
    }
    console.error(`Option '${option.value}' can't be transformed to Enum`);
    return null;
  });
  return signsOrNull.filter((sign: Sign | null): sign is Sign => sign !== null);
};
