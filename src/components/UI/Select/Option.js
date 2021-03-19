import styled from "styled-components";

const Style = styled.div`
  user-select: none;
  padding: 8px 16px;
  background: var(--primary-2);
  font-size: 14px;
  white-space: nowrap;

  &:hover {
    background: var(--primary-3);
  }
`

const Option = props => {
  return (
    <Style onClick={() => props.setValue(props.value)}>
      {props.children}
    </Style>
  )
}

export default Option;