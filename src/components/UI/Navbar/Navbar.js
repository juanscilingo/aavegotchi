import { Link } from "react-router-dom"
import styled from "styled-components"

const Style = styled.div`
  position: fixed;
  top: 0;
  height: var(--navbar-height);
  background: var(--pink);
  width: 100%;
  box-shadow: var(--box-shadow);
  z-index: 1;
`

const Content = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 25px 15px;
`

const Logo = styled.div`
  margin-right: auto;
  font-size: 18px;
`

const Item = styled.div`
  margin-left: 20px;
`

const Navbar = () => {
  return (
    <Style>
      <Content>
        <Item>
          <Link to="/baazaar">Baazaar</Link>
        </Item>
        <Item>
          <Link to="/utils">Utils</Link>
        </Item>
        <Item>
          <Link to="/aavegotchi/8431">Aavegotchi</Link>
        </Item>
      </Content>
    </Style>
  )
}

export default Navbar;