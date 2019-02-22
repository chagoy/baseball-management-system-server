import React from 'react';
import { connect } from 'react-redux';
import { fetchCompletedGames } from '../actions/games'
import GameElement from './game-element';
import Loading from './loading';
import { Header, Grid } from 'semantic-ui-react';

export class Results extends React.Component {
	componentDidMount() {
		return this.props.dispatch(fetchCompletedGames())
	}

	render()  {

		let gamesData = this.props.games.length > 0 ? this.props.games.map((game, index) => <GameElement user={this.props.user ? this.props.user.admin : false} key={ index } game={ game }/>) : 'No games on the schedule';
		return (
			<React.Fragment>
				<Header textAlign='center'>Spring 2019 Results</Header>
				<Grid textAlign='center' columns={16}>
					<Grid.Row>
						<Grid.Column computer={10} mobile={16}>
							{gamesData}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => ({
	user: state.auth.currentUser,
	games: state.game.games
})

export default connect(mapStateToProps)(Results)