import styled, { css } from "styled-components/native";

interface StyledBoxProps {
    alt?: boolean;
}
export const StyledBox = styled.Text<StyledBoxProps>`
    border: 1px solid black;
    ${props =>
        props.alt &&
        css`
            border-color: red;
        `}
`;
