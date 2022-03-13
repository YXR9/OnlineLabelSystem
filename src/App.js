import React, { useState} from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Registerpage from './pages/register';
import Labelpage from './pages/labelpage';
import Uploadpage from './pages/uploadpage';
import Codingpage from './pages/codingpage';
import Filelistpage from './pages/filelistpage';
import Codepage from './pages/codepage';
import AddEncodeTaskpage from './pages/addencodetask';
import CodeSystempage from './pages/codesystempage';
import AddCodeSystempage from './pages/addcodesystempage';
import { useHistory } from 'react-router-dom';
// import Footer from './components/Footer';

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }

function App() {
    // const [token, setToken] = useState();

    // if (!token) {
    //     return  <Login setToken={setToken} />
    // }


  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/list" component={Filelistpage} />
          <Route exact path="/register" component={Registerpage} />
          <Route exact path="/labelpage" component={Labelpage} />
          <Route exact path="/uploadpage" component={Uploadpage} />
          <Route exact path="/codingpage" component={Codingpage} />
          <Route exact path="/codepage" component={Codepage} />
          <Route exact path="/addencodetask" component={AddEncodeTaskpage} />
          <Route exact path="/codesystem" component={CodeSystempage} />
          <Route exact path="/addcodesystem" component={AddCodeSystempage} />
        </Switch>
        {/* <Footer style={{ background: "url(http://1.bp.blogspot.com/-YODKGVfWimA/VaXaz68qdRI/AAAAAAAAMFA/MZZGV1lGxd4/s1600/yellow-bg-100.jpg) #f2f0ec", color: "#4b4741", textAlign: 'center', position: "absolute", boxSizing: "border-box", bottom: "0", width: "100%", fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
    </BrowserRouter>
  );
}

export default App;