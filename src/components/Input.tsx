import * as React from "react";
import styled from "styled-components/native";
import { KeyboardTypeOptions } from "react-native";

const StyledInput = styled.TextInput`
    width: 100px;
    border: 1px solid black;
`;

interface Props {
    keyboardType?: KeyboardTypeOptions;
    defaultValue?: string;
}
export const Input: React.FC<Props> = props => {
    const [value, setValue] = React.useState<string>(props.defaultValue || "");
    const test = "lol";

    return (
        <StyledInput
            value={value}
            onChangeText={setValue}
            keyboardType={props.keyboardType}
        />
    );
};
