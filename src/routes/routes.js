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
import Meta from "@/pages/Meta";

function Routes() {
  return (
    <HashRouter forceRefresh={true}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <DefaultLayout exact path="/file" component={Files} />
        <DefaultLayout exact path="/file/:id" component={Files} />
        <DefaultLayout exact path="/meta" component={Meta} />
        <DefaultLayout exact path="/meta/:id" component={Meta} />
      </Switch>
    </HashRouter>
  );
}

export default Routes;
