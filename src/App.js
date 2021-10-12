import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  HashRouter,
} from "react-router-dom";

import Login from "@/pages/Login";
import Files from "@/pages/Files";
import DefaultLayout from "@/components/defaultLayout";

function App() {
  return (
    <HashRouter basename="/#">
      <Switch>
        <Route path="/login" component={Login} />
        <DefaultLayout path="/" component={Files} />
      </Switch>
    </HashRouter>
  );
}

export default App;
