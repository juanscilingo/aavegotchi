import Aavegotchi from "pages/Aavegotchi/Aavegotchi";
import Utils from "pages/Utils/Utils";
import Baazaar from "pages/Baazaar/Baazaar";
import Home from "pages/Home/Home";
import { Route, Switch } from "react-router-dom";
import useUserContext from "hooks/useUserContext";
import UserAavegotchis from "pages/UserAavegotchis/UserAavegotchis";

const Routes = props => {
  const { user } = useUserContext();

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/baazaar/:category?" component={Baazaar} />
      <Route path="/utils" component={Utils} />
      <Route path="/aavegotchi/:id" component={Aavegotchi} />
      {user.account && user.isMatic && (
        <Route path="/user/aavegotchis" component={UserAavegotchis} />
      )}
      <Route path="*" exact component={Home} />
    </Switch>
  )
}

export default Routes;