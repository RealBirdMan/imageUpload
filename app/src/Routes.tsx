import React from 'react';
import { Route, Switch} from "react-router-dom"

import {AuthContext} from "./context/auth-context"
import {useAuth} from "./hooks/auth-hook"
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login"
import ImageUpload from "./pages/ImageUpload"


const Routes: React.FC = () => {
  const {token, login, logout} = useAuth()

  return(
    <AuthContext.Provider value={{
      token: token,
      login: login,
      logout: logout
    }}>
      <button onClick={logout}>logout</button>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/upload" component={ImageUpload}/>
        <Route exact path="/" component={Home}/>
      </Switch>

    </AuthContext.Provider>
  )
}

export default Routes;
