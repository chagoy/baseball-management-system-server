import React from 'react';
import { connect } from 'react-redux';
import { getGame } from '../actions/games';
require('./game-page.css');

export class GamePage extends React.Component {
	componentDidMount() {
		if (!this.props.game) {
			return this.props.dispatch(getGame(this.props.match.params.id))
		}
	}

	createGame(game) {
		return (
			<div>
				<div className="flex-row">
					<div className="flex-c-50">
						<h3>{game.date}</h3>
						<p>{game.location}</p>
					</div>
				</div>
				<div className="flex-row">
					<div className="flex-c-40">
						<h1 className="team-title">{game.away.name}</h1>
						<h3>({game.away.record})</h3>
					</div>
					<div className="flex-c-20">
						<h1 className="team-title">vs</h1>
					</div>
					<div className="flex-c-40">
						<h1 className="team-title">{game.home.name}</h1>
						<h3>({game.home.record})</h3>
					</div>
				</div>
			</div>
		)
	}

	render() {
		const gameInfo = this.props.game ? this.createGame(this.props.game) : 'No game information'
		return (
			<div>
					{gameInfo}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null,
	game: state.game.game
});

export default connect(mapStateToProps)(GamePage)