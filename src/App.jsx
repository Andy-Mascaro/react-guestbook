import React from 'react'
import { Switch, Route } from 'react-router-dom';
import {BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Auth/Login";


export default function App() {
return (
   <Router>
     <Switch>
       <Route path="/login">
         <Login/>
       </Route>
     </Switch>
   </Router>
);
}
