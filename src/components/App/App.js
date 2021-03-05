import Navbar from "components/UI/Navbar/Navbar";
import styled from "styled-components";
import Routes from "routes/router";

const Style = styled.div`

`

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  margin-top: var(--navbar-height);
  padding: 25px 15px;
`

const App = () => {
  return (
    <Style>
      <Navbar />
      <Content>
        <Routes />
      </Content>
    </Style>
  );
}

export default App;