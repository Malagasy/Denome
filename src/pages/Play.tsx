import { push } from "connected-react-router";
import * as React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { compose, pure } from "recompose";
import { PlayActions } from "../store/play/action";

interface PassProps {}

const actions = {
  fetchFormula: PlayActions.fetchFormula.request,
  push,
};

type Props = PassProps & typeof actions;

export const PlayBase: React.FC<Props> = props => {
  React.useEffect(() => {
    console.log("pppp");
    props.fetchFormula({});
  }, []);
  return <Text>Test</Text>;
};

export const Play = compose<Props, {}>(
  connect(
    undefined,
    actions
  ),
  pure
)(PlayBase);
