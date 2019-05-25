import * as React from "react";
import {
  Modal as ModalNative,
  ModalProps,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { StyledModalContainer, StyledModalShadow } from "./styled";

interface PassProps {
  transparent: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

type Props = ModalProps & PassProps;

export const Modal: React.FC<Props> = ({
  children,
  transparent,
  containerStyle,
  ...restProps
}) => {
  return (
    <ModalNative {...restProps} transparent={true}>
      <StyledModalContainer>
        <TouchableWithoutFeedback
          onPress={() => restProps.onRequestClose && restProps.onRequestClose()}
        >
          <StyledModalShadow transparent={transparent} />
        </TouchableWithoutFeedback>
        <View style={containerStyle}>{children}</View>
      </StyledModalContainer>
    </ModalNative>
  );
};
