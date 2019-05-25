import styled from "styled-components/native";

export const StyledModalShadow = styled.View<{
  transparent: boolean;
}>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(
    255,
    255,
    255,
    ${props => (props.transparent ? 0.7 : 1)}
  );
`;

export const StyledModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
