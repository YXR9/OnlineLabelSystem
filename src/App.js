import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Labelpage from './pages/labelpage';
import Uploadpage from './pages/uploadpage';
import Codingpage from './pages/codingpage';
import Loginpage from './pages/login';
import Registerpage from './pages/register';
// import Footer from './components/Footer';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
const { Footer } = Layout;

function App() {
  console.log("App");
  return (
    <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Loginpage} />
          <Route exact path="/register" component={Registerpage} />
          <Route exact path="/labelpage" component={Labelpage} />
          <Route exact path="/uploadpage" component={Uploadpage} />
          <Route exact path="/codingpage" component={Codingpage} />
        </Switch>
        <Footer style={{ backgroundColor: "#614700", color: "#FFF", textAlign: 'center', position: "absolute", boxSizing: "border-box", bottom: "0", width: "100%" }}>Ant Design ©2018 Created by Ant UED</Footer>
    </BrowserRouter>
  );
}

export default App;