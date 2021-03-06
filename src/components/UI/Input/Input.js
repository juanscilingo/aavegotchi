import { forwardRef } from "react";
import styled, { css } from "styled-components";

const block = css`
  width: 100%;
`

const StyledInput = styled.input`
  display: inline-block;
  border-radius: 6px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.2);
  color: white;
  margin-bottom: 10px;
  padding: 10px;

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--placeholder-color);
    opacity: 1; /* Firefox */
  }

  ${props => props.block && block};
`

const Input = forwardRef((props, ref) => {
  return <StyledInput {...props} ref={ref} />
})

export default Input;