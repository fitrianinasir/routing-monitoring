import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import FilterPage from './Components/FilterPage/FilterPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/filter-page" component={FilterPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
