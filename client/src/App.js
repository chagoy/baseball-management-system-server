import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import LandingPage from './components/landing-page';
import Dashboard from './components/dashboard';
import LoginPage from './components/login-page';
import RegisterPage from './components/register-page';
import RegisterPlayer from './components/register-player';
import Player from './components/player';
import PassResetPage from './components/pass-reset-page';
import AdminCreate from './components/admin-create';
import Navbar from './components/navbar';
import Schedule from './components/schedule';
import Team from './components/team';
import Footer from './components/footer';
import AdminPage from './components/admin-page';
import PlayerPage from './components/player-page';
import ResetPage from './components/reset-page';
import LeaguePage from './components/league-page';
import GamePage from './components/game-page';
import CustomNavbar from './components/custom-navbar';
import StandingsPage from './components/standings-page';
import TeamAssign from './components/team-assign'
import PlayerTeam from './components/player-team';
import Results from './components/results';

export class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        {/*<CustomNavbar />*/}
        <div className="">
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path='/league' component={LeaguePage} />
          <Route exact path='/schedule' component={Schedule} />
          <Route exact path="/register-player" component={RegisterPlayer} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/player/:id" component={PlayerPage} />
          <Route path="/team/:id" component={Team} />
          {/*<Route path='/game/:id' component={GamePage} />*/}
          <Route exact path='/standings' component={StandingsPage} />
          <Route path="/create" component={AdminCreate} />
          <Route path="/admin" component={AdminPage} />
          <Route exact path='/reset' component={ResetPage} />
          <Route path='/reset/:hash' component={PassResetPage} />
          <Route path='/teamassign' component={TeamAssign} />
          <Route path='/team2' component={PlayerTeam} />
          <Route path='/results' component={Results} />
        </div>
        {/*<Footer/>*/}
      </div>
    );
  }
}

const mapStateToProps = state => ({
	hasAuthToken: state.auth.authToken !== null,
	loggedIn: state.auth.currentUser !== null
})

export default withRouter(connect(mapStateToProps)(App));
