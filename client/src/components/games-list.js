import React from 'react';
import { connect } from 'react-redux';
import { fetchGames, selectedGameSuccess } from '../actions/games';
import GameElement from './game-element';
import Loading from './loading';
require('./game-element')

export class GamesList extends React.Component {
	componentDidMount() {
		return this.props.dispatch(fetchGames())
	}

	handleClick(game) {
		console.log(game)
		return this.props.dispatch(selectedGameSuccess(game.game))
	}

	render() {
		
		// let gamesData = this.props.games.length > 0 ? this.props.games.map((game, index) => <Link onClick={e => this.handleClick({game})} key={index} to={`/game/${game.id}`}><GameElement key={ index } game={ game }/></Link>) : 'Loading games...';
    let gamesData = this.props.games.length > 0 ? this.props.games.map((game, index) => <GameElement admin={this.props.admin} key={ index } game={ game }/>) : 'No games to show';

		return (
			//this used to be an unordered list, changed to div to sort out the width
			<div className="games-list">
				{gamesData}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	admin: state.auth.currentUser.admin,
	games: state.game.games
});

export default connect(mapStateToProps)(GamesList);