import { AppState } from "..";
import { createSelector } from "reselect";

const root = (state: AppState) => state.configuration;

export const SelectConfigurationSigns = createSelector(
    root,
    res => {
        return res.signs;
    }
);

export const SelectConfigurationNumberOfTerms = createSelector(
    root,
    res => {
        return res.numberOfTerms;
    }
);
