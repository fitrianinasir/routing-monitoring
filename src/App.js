import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './Components/Home'
import FilterPage from "./Components/FilterPage/FilterPage";
import FilterData from "./Components/FilterData/FilterData";
import "./App.css";

function App() {
  return (
    <div className="App">
      
      <FilterData>
        <BrowserRouter>
          <Switch>
            <Route exact path='/home' component={Home}/>
            <Route exact path="/merchandise/:urlName" component={FilterPage} />
          </Switch>
        </BrowserRouter>
      </FilterData>
    </div>
  );
}

export default App;
