import styled from "styled-components";
import Gotchi from 'components/Aavegotchi/Aavegotchi';

const Style = styled.div`

`

const Aavegotchi = props => {
  return (
    <Style>
      <h4>Aavegotchi</h4>
      <Gotchi aavegotchi={props.aavegotchi} />
    </Style>
  )
}

export default Aavegotchi;