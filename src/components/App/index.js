import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Entete from '../Entete'
import Accueil from '../Accueil'
import Piedpage from '../Piedpage'
import Bienvenue from '../Bienvenue'
import Login from '../Login'
import Signup from '../Signup'
import ErrorPage from '../ErrorPage'
import ForgetPassword from '../ForgetPassword'
import '../../App.css';

function App() {
  return (
    <Router>
      <Entete />

      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route path="/bienvenue" component={Bienvenue} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgetpassword" component={ForgetPassword} />
        <Route component={ErrorPage} />
      </Switch>

      <Piedpage />
    </Router>
  );
}

export default App;
