import React from 'react';
import { connect } from 'react-redux';
import { getTeam, fetchTeamGames, deleteTeam } from '../actions/teams';
import GameElement from './game-element';
import { Button, Container, Header } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import TeamEdit from './team-edit';

export class Team extends React.Component {
	componentWillMount() {
		console.log(this.props.match.params.id);
		let teamId = this.props.match.params.id;
		return Promise.all([
			this.props.dispatch(fetchTeamGames(teamId)),
			this.props.dispatch(getTeam(teamId))
		])
	}

	handleClick(e) {
		let teamId = this.props.match.params.id;
		return this.props.dispatch(deleteTeam(teamId));
	}

	render() {
		if (!this.props.loggedIn) {
			return <Redirect to='/' />;
		}

		let gamesData = this.props.games.length > 0 ? this.props.games.map((game, index) => <GameElement admin={this.props.admin} key={ index } game={ game }/>) : 'No games to show';

		return (
			<Container>
				<Header as='h1'>{this.props.team.name}</Header>
				{gamesData}
				<br/>
				<TeamEdit/>
			</Container>
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