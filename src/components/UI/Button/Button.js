import styled, { css } from "styled-components";

const block = css`
  width: 100%;
`

const small = css`
  padding: 3px 6px;
  font-size: 12px;
`

const color = c => css`
  background: var(--${c});
  :hover {
    background: var(--${c}-2);
  }
`

const StyledButton = styled.button`
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  outline: none;
  user-select: none;
  background: var(--secondary);

  :hover {
    background: var(--secondary-2);
  }

  ${props => props.color && color(props.color)};
  ${props => props.block && block};
  ${props => props.small && small};
`

const Button = props => {
  return (
    <StyledButton {...props}>
      {props.children}
    </StyledButton>
  )
}

export default Button;