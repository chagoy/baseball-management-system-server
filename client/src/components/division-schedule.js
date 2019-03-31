import React from 'react';
import { connect } from 'react-redux';
import { fetchDivisionGames } from '../actions/games';
import GameElement from './game-element';

export class DivisionSchedule extends React.Component {
    componentWillMount() {
        let division = this.props.match.params.division;
        console.log(division);
        return this.props.dispatch(fetchDivisionGames(division))
    }

    render() {
        let gamesData = this.props.games.length > 0 ? this.props.games.map((game, index) => <GameElement user={this.props.user ? this.props.user.admin : false} key={ index } game={ game }/>) : 'No games on the schedule';

        return (
            <div>
                {gamesData}
            </div>
        )
    }
}

const mapStateToProps = state => ({
	user: state.auth.currentUser,
	games: state.game.games
});

export default connect(mapStateToProps)(DivisionSchedule)