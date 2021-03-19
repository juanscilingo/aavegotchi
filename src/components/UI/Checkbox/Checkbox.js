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
`

const Input = styled.input`
  display: none;
`

const CheckmarkContainer = styled.div`
  vertical-align: middle;
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 3px;
`

const checked = css`
  background-color: #fff;
  
  &:after {
    width: 10px;
    transition: width 150ms ease 100ms; // enlarge the tick
  }
  
  &:before {
    width: 5px;
    transition: width 150ms ease 100ms; // enlarge the tick
  }
`

const Checkmark = styled.div`
  display: inline-block;
  position: relative;
  background-color: transparent;
  width: 25px;
  height: 25px;
  transform-origin: center;
  border: 2px solid #fff;
  border-radius: 3px;
  vertical-align: -6px;
  margin-right: 10px;
  transition: background-color 150ms 200ms, transform 350ms cubic-bezier(.78,-1.22,.17,1.89); // custom ease effect for bouncy animation

  &:before {
    content: "";
    width: 0px;
    height: 2px;
    border-radius: 2px; // so that the tick has nice rounded look
    background: #fff;
    position: absolute;
    transform: rotate(45deg);
    top: 13px; // you'll need to experiment with placement depending on the dimensions you've chosen
    left: 9px; // you'll need to experiment with placement depending on the dimensions you've chosen
    transition: width 50ms ease 50ms;
    transform-origin: 0% 0%;
  }
  
  &:after {
    content: "";
    width: 0;
    height: 2px;
    border-radius: 2px; // so that the tick has nice rounded look
    background: #fff;
    position: absolute;
    transform: rotate(305deg);
    top: 16px; // you'll need to experiment with placement depending on the dimensions you've chosen
    left: 10px; // you'll need to experiment with placement depending on the dimensions you've chosen
    transition: width 50ms ease;
    transform-origin: 0% 0%;
  }

  ${props => props.checked && checked};
`

const Checkbox = props => {
  return (
    <Style onClick={() => props.onChange(!props.checked)}>
      <Label>{props.label}</Label>
      <Input type="checkbox" checked={!!props.checked} readOnly />
      <CheckmarkContainer>
        <Checkmark checked={!!props.checked} />
      </CheckmarkContainer>
    </Style>
  )
}

export default Checkbox;