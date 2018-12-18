import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { getAllTeams } from '../actions/teams';
import { assignTeam, fetchAllPlayers } from '../actions/players';

export class TeamAssign extends React.Component {
		constructor(props) {
		super(props);
		this.state = {
			options: [],
			value: ''
		};
	}

	componentDidMount() {
		return Promise.all([
				this.props.dispatch(getAllTeams()),
				this.props.dispatch(fetchAllPlayers())
			])
	}

	onSubmit(values) {
		return this.props.dispatch(assignTeam(values));
	}

	handleChange = (event) => {
		let players = this.props.players;
		let query = event.target.value.toLowerCase();
		let filteredPlayers = players.filter((player) => player.fullName.toLowerCase().indexOf(query) !== -1)
		
		this.setState({
			options: filteredPlayers,
			value: filteredPlayers[0]._id
		})
	}

	render() {
		let preOptions = this.props.players ? this.props.players.map((player, index) => <option key={index} value={player._id}>{player.fullName}</option>) : 'loading';
		let options = this.state.options.length > 0 ? this.state.options.map((player, index) => <option key={index} value={player._id}>{player.fullName}</option>) : preOptions;

		let teams = this.props.teams ? this.props.teams.map((team, index) => <option key={index} value={team._id}>{team.name} - {team.division}</option>) : 'loading'

		return (
			<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label htmlFor='team'>Team</label>
				<Field name='team' component='select'>
					{teams}
				</Field>
				<label htmlFor='name'>Search</label>
				<input name='name' onChange={this.handleChange} />
				<Field className='player-select' name='player' component='select' value={this.state.value}>
					{options} 
				</Field>
				<button type='submit' className='team-button' disabled={this.props.pristine || this.props.submitting}>Submit</button>
			</form>
		)
	}
}

const afterSubmit = (result, dispatch) => dispatch(reset('assign'));

const mapStateToProps = state => ({
	teams: state.team.teams,
	players: state.player.players
});

TeamAssign = connect(mapStateToProps)(TeamAssign)

export default reduxForm({
	form: 'assign',
	onSubmitSuccess: afterSubmit
})(TeamAssign)
