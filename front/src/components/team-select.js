import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import Select from './select';
import {getAllTeams} from '../actions/teams';
import {updateTeam} from '../actions/players';

export class TeamForm extends React.Component {
	componentDidMount() {
		return this.props.dispatch(getAllTeams());
	}

	onSubmit(values) {
		this.props.dispatch(updateTeam(this.props.id, values))
		return <Redirect to='dashboard' />
	}

	render() {
		//we are going to be using the id to send back to the server, not the name
		let obj = {};
		const options = this.props.teams.forEach(team => obj[team._id] = `${team.name} - ${team.division}`);
		

		return (
			<form className="form"
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label for="team">Change Team</label>
				<Field placeholder={this.props.team} 
							component={Select} 
							selectInput='team-select' 
							name="team" 
							options={obj} />
				<button className='team-button' type="submit">Change</button>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	teams: state.team.teams,
	id: state.player.player._id
})

export default reduxForm({
	form: 'team',
})(connect(mapStateToProps)(TeamForm));