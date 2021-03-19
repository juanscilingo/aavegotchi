import styled, { css } from "styled-components";

const Style = styled.div`
  cursor: pointer;
  display: inline-block;
  user-select: none;
`

const Label = styled.label`
  cursor: pointer;
  vertical-align: middle;
  display: inline-block;
  margin-right: 10px;
  line-height: 25px;
  font-size: 14px;
`

const Input = styled.input`
  display: none;
`

const checked = css`
  &:before {
    transform: translateX(18px);
    opacity: 1;
  }
`

const Toggle = styled.div`
  vertical-align: middle;
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: .4s;
  border-radius: 34px;
  width: 44px;
  height: 24px;
  border: 2px solid white;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    opacity: .5;
  }

  ${props => props.checked && checked};
`

const Switch = props => {
  return (
    <Style onClick={() => props.onChange(!props.checked)}>
      <Input type="checkbox" checked={!!props.checked} readOnly />
      <Label>{props.label}</Label>
      <Toggle checked={!!props.checked} />
    </Style>
  )
}

export default Switch;