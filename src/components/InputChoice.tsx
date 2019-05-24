import { filter, findIndex } from "lodash";
import * as React from "react";
import { compose, withHandlers } from "recompose";
import { StyledBox } from "./InputChoice.styled";

interface OptionItem {
    value: string;
    label: string;
}

interface PassProps {
    options: OptionItem[];
    values: OptionItem[];
    onChange: (options: OptionItem[]) => void;
}

interface EnhancedProps {
    onPressBox: (option: OptionItem) => void;
}
type Props = PassProps & EnhancedProps;

const InputChoiceBase: React.FC<Props> = props => {
    const isActive = (option: OptionItem): boolean => {
        return findIndex(props.values, { value: option.value }) !== -1;
    };

    return (
        <>
            {props.options.map(option => (
                <StyledBox
                    key={option.value}
                    onPress={() => props.onPressBox(option)}
                    alt={isActive(option)}
                >
                    {option.label}
                </StyledBox>
            ))}
        </>
    );
};
const onPressBox: (
    props: PassProps
) => EnhancedProps["onPressBox"] = props => option => {
    const index = findIndex(props.values, { value: option.value });
    if (index === -1) {
        return props.onChange([...props.values, option]);
    } else {
        return props.onChange(
            filter(props.values, value => value.value !== option.value)
        );
    }
};

export const InputChoice = compose<Props, PassProps>(
    withHandlers<PassProps, Partial<EnhancedProps>>({
        onPressBox,
    })
)(InputChoiceBase);
