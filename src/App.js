import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import TopBar from "./topbar/TopBar";
import Write from "./write/Write";

import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import { Context } from "./context/Context";
import { useContext } from "react";

function App(){
  const {user}=useContext(Context)
  return (
    <Router>
      <TopBar></TopBar> 
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            {user ? <Home></Home> : <Register />}
          </Route>
          <Route path="/login">
            {user ? <Home></Home> : <Login />}
          </Route>
          <Route path="/write">
            {user ? <Write></Write> : <Register />}
          </Route>
          <Route path="/settings">
            {user ? <Settings></Settings> : <Register />}
          </Route>
          <Route path="/post/:postId">
            <Single/>
          </Route>
      </Switch>
    </Router>
  )
}

export default App;