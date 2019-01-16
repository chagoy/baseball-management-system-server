import React from 'react';
import { connect } from 'react-redux';
import { fetchTeam } from '../actions/teams';
import { fetchAllPlayers} from '../actions/players';

export class Team extends React.Component {
	componentWillMount() {
		return this.props.dispatch(fetchAllPlayers())
	}

	render() {

		return (
			<h1>under construction</h1>
		)
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentuser !== null,
	players: state.player.players,
	team: state.team.team
})

export default connect(mapStateToProps)(Team)