import React from 'react';
import './App.css';
import {Route, BrowserRouter,Switch} from "react-router-dom"

import Huge from "./component/container"
import Index from "./component"
function App() {
  return (<BrowserRouter>
     <Switch>
      <Route path="/:id" component={Huge}/>
     <Route path="/" component={Index}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
