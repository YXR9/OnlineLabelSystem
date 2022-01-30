import React from 'react';
import './App.css';
import Labelpage from './pages/labelpage';
import Uploadpage from './pages/uploadpage';
import Codingpage from './pages/codingpage';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

function App() {
  console.log("App");
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/labelpage" component={Labelpage} />
        <Route exact path="/uploadpage" component={Uploadpage} />
        <Route exact path="/codingpage" component={Codingpage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;