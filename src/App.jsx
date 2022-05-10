import React from 'react'
import { Switch, Route } from 'react-router-dom';
import {BrowserRouter as Router } from "react-router-dom";
import { PrivateRoute } from './components/PrivateRoute.jsx/PrivateRoute';
import Login from "./views/Auth/Login";
import Home from './views/Home/Home';

export default function App() {
return (
   <Router>
     <Switch>
       <Route path="/login">
         <Login/>
         </Route>
         <PrivateRoute path="/">
         <Home />
       </PrivateRoute>
     </Switch>
   </Router>
);
}
