import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Registerpage from './pages/register';
import Labelpage from './pages/labelpage';
import Uploadpage from './pages/uploadpage';
import Codingpage from './pages/codingpage';
import Navbar from './components/Navbar';
import Filelistpage from './pages/filelistpage';
import Codepage from './pages/codepage';
import AddEncodeTaskpage from './pages/addencodetask';
import AddCodeingStructurepage from './pages/addcodestructurepage';
// import Footer from './components/Footer';
import { Layout } from 'antd';
const { Footer } = Layout;

function App() {
  console.log("App");
  return (
    <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
            {/* {loggedIn ? <Redirect to="/uploadpage"/>: component={Loginpage}} */}
          <Route exact path="/register" component={Registerpage} />
          <Route exact path="/labelpage" component={Labelpage} />
          <Route exact path="/uploadpage" component={Uploadpage} />
          <Route exact path="/codingpage" component={Codingpage} />
          <Route exact path="/list" component={Filelistpage} />
          <Route exact path="/codepage" component={Codepage} />
          <Route exact path="/addencodetask" component={AddEncodeTaskpage} />
          <Route exact path="/addstructure" component={AddCodeingStructurepage} />
        </Switch>
        <Footer style={{ backgroundColor: "#787A91", color: "#EEEEEE", textAlign: 'center', position: "absolute", boxSizing: "border-box", bottom: "0", width: "100%", fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </BrowserRouter>
  );
}

export default App;