import * as React from "react";
import { Text, Picker, TouchableHighlight, Button } from "react-native";
import { connect } from "react-redux";
import { compose, pure } from "recompose";
import { createStructuredSelector } from "reselect";
import { InputChoice, OptionItem } from "../components/InputChoice";
import { AppState } from "../store";
import { ConfigurationActions, Sign } from "../store/configuration/action";
import {
  SelectConfigurationNumberOfTerms,
  SelectConfigurationSigns,
} from "../store/configuration/selector";
import {
  convertManySignToOptions,
  convertManyOptionToSigns,
} from "../utils/utils";
import { times } from "lodash";
import { Modal } from "../components/Modal";
import { push } from "connected-react-router";

interface GameConfigurationProps {
  signs: Sign[];
  numberOfTerms: number;
}

const mapStateToProps = createStructuredSelector<
  AppState,
  GameConfigurationProps
>({
  signs: SelectConfigurationSigns,
  numberOfTerms: SelectConfigurationNumberOfTerms,
});

const actions = {
  setSigns: ConfigurationActions.setSigns,
  setNumberOfTerms: ConfigurationActions.setNumberOfTerms,
  push,
};

type Props = GameConfigurationProps & typeof actions;

const options: OptionItem[] = [
  {
    label: "add",
    value: Sign.ADD,
  },
  {
    label: "sub",
    value: Sign.SUBTRACT,
  },
  {
    label: "divide",
    value: Sign.DIVIDE,
  },
  {
    label: "multiply",
    value: Sign.MULTIPLY,
  },
];
export const GameConfigurationBase: React.FC<Props> = props => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  return (
    <>
      <Text>Number of terms</Text>
      <TouchableHighlight onPress={() => setShowModal(true)}>
        <Text>{props.numberOfTerms}</Text>
      </TouchableHighlight>
      <Modal
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <Picker
          selectedValue={props.numberOfTerms}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue: number) =>
            props.setNumberOfTerms(itemValue)
          }
        >
          {times(10, number => (
            <Picker.Item
              key={number}
              label={number.toString()}
              value={number}
            />
          ))}
        </Picker>
      </Modal>
      <Text>Pick signs</Text>
      <InputChoice
        options={options}
        values={convertManySignToOptions(props.signs)}
        onChange={options => props.setSigns(convertManyOptionToSigns(options))}
      />
      <Button
        title={"Play"}
        onPress={() => {
          console.log("test");
          props.push("/play");
        }}
      />
    </>
  );
};

export const GameConfiguration = compose<Props, {}>(
  connect(
    mapStateToProps,
    actions
  ),
  pure
)(GameConfigurationBase);
