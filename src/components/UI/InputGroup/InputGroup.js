import styled from 'styled-components';

const InputGroup = styled.div`
  *:not(:first-child) {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  *:not(:last-child) {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`

export default InputGroup;