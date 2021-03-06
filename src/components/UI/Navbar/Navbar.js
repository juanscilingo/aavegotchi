import ConnectButton from "components/Metamask/ConnectButton"
import useUserContext from "hooks/useUserContext"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import formatter from 'utils/formatter';
import Badge from "../Badge/Badge";

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

const right = css`
  margin-left: auto;
`

const flex = css`
  display: flex;
  align-items: center;
`

const Item = styled.div`
  margin-left: 20px;

  &:first-child {
    margin-left: 0px;
  }

  ${props => props.right && right};
  ${props => props.flex && flex};
`

const Navbar = () => {
  const { user } = useUserContext();

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
        <Item right flex>
          {user.account && (
            <Item>
              <Badge>{formatter.trimmedAddress(user.account)}</Badge>
            </Item>
          )}
          <Item>
            <ConnectButton>Connect</ConnectButton>
          </Item>
        </Item>
      </Content>
    </Style>
  )
}

export default Navbar;