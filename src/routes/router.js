import Aavegotchi from "pages/Aavegotchi/Aavegotchi";
import Utils from "pages/Utils/Utils";
import Baazaar from "pages/Baazaar/Baazaar";
import Home from "pages/Home/Home";
import { Route, Switch } from "react-router-dom";

const Routes = props => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/baazaar/:category?" component={Baazaar} />
      <Route path="/utils" component={Utils} />
      <Route path="/aavegotchi/:id" component={Aavegotchi} />
    </Switch>
  )
}

export default Routes;