import React from 'react';
import { connect } from 'react-redux';
import { fetchTeam } from '../actions/teams';
import { fetchTeamGames } from '../actions/teams';
import GameElement from './game-element';

export class Team extends React.Component {
	componentWillMount() {
		console.log(this.props.match.params.id);
		let teamId = this.props.match.params.id;
		return this.props.dispatch(fetchTeamGames(teamId))
	}

	render() {
		let gamesData = this.props.games.length > 0 ? this.props.games.map((game, index) => <GameElement admin={this.props.admin} key={ index } game={ game }/>) : 'No games to show';

		return (
			<React.Fragment>
				{gamesData}
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentuser !== null,
	players: state.player.players,
	team: state.team.team,
	games: state.team.games
})

export default connect(mapStateToProps)(Team)