import React from 'react';
import { connect } from 'react-redux';
import Player from './player';
import { Redirect, Link, withRouter } from 'react-router-dom';

export class PlayerPage extends React.Component {
	render() {
		if (!this.props.loggedIn) {
			return <Redirect to='/' />;
		}

		return (
			<Player />
		)
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null,
	player: state.player.player,
	team: state.team.team,
	user: state.player.player.user
})
export default withRouter(connect(mapStateToProps)(PlayerPage));

