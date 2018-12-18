import React from 'react';
import { connect } from 'react-redux';
import { fetchUpcomingGames } from '../actions/games';
import GameElement from './game-element';
import Loading from './loading';
require('./schedule.css');

export class Schedule extends React.Component {
	componentDidMount() {
		return this.props.dispatch(fetchUpcomingGames())
	}

	render() {
		let gamesData = this.props.games.length > 0 ? this.props.games.map((game, index) => <GameElement admin={this.props.admin} key={ index } game={ game }/>) : 'No games on the schedule';
		return (
			<div className="schedule">
				<div className='flex-row'>
					<h1 className="schedule-title">Fall 2018 Schedule</h1>
				</div>
				<div className='flex-row'>
					<ul className="schedule-list">
						{gamesData}
					</ul>
				</div>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	// admin: state.auth.currentUser.admin,
	games: state.game.games
});

export default connect(mapStateToProps)(Schedule)