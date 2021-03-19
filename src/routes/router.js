import Aavegotchi from "pages/Aavegotchi/Aavegotchi";
import Utils from "pages/Utils/Utils";
import Baazaar from "pages/Baazaar/Baazaar";
import Home from "pages/Home/Home";
import { Route, Switch } from "react-router-dom";
import useUserContext from "hooks/useUserContext";
import UserAavegotchis from "pages/UserAavegotchis/UserAavegotchis";
import Aavegotchis from "pages/Aavegotchis/Aavegotchis";
import Test from "pages/Test/Test";

const Routes = props => {
  const { user } = useUserContext();

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/baazaar/:category?" component={Baazaar} />
      <Route path="/utils" component={Utils} />
      <Route path="/aavegotchi/:id" component={Aavegotchi} />
      <Route path="/aavegotchis/:id?" component={Aavegotchis} />
      {user.account && user.isMatic && (
        <Route path="/user/aavegotchis" component={UserAavegotchis} />
      )}
      <Route path="/test" component={Test} />
      <Route path="*" exact component={Home} />
    </Switch>
  )
}

export default Routes;