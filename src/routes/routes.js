import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  HashRouter,
} from "react-router-dom";

import DefaultLayout from "@/components/defaultLayout";
import Login from "@/pages/Login";
import Files from "@/pages/Files";

function Routes() {
  return (
    <HashRouter basename="/#">
      <Switch>
        <Route path="/login" component={Login} />
        <DefaultLayout path="/" component={Files} />
      </Switch>
    </HashRouter>
  );
}

export default Routes;
