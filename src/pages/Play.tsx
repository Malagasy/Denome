import { push } from "connected-react-router";
import * as React from "react";
import { connect } from "react-redux";
import { Text } from "react-native";
import { compose, pure } from "recompose";
import { createStructuredSelector } from "reselect";
import { AppState } from "../store";
import { ConfigurationActions } from "../store/configuration/action";
import {
  SelectConfigurationNumberOfTerms,
  SelectConfigurationSigns,
} from "../store/configuration/selector";

interface PassProps {}

const mapStateToProps = createStructuredSelector<AppState, PassProps>({
  signs: SelectConfigurationSigns,
  numberOfTerms: SelectConfigurationNumberOfTerms,
});

const actions = {
  setSigns: ConfigurationActions.setSigns,
  setNumberOfTerms: ConfigurationActions.setNumberOfTerms,
  push,
};

type Props = PassProps & typeof actions;

export const PlayBase: React.FC<Props> = props => {
  return <Text>Test</Text>;
};

export const Play = compose<Props, {}>(
  connect(
    mapStateToProps,
    actions
  ),
  pure
)(PlayBase);
