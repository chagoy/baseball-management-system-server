import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import Select from './select';
import { createGame } from '../actions/games';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import renderDatePicker from "./render-datepicker";

class GameForm extends React.Component {
	onSubmit(values) {
		return this.props.dispatch(createGame(values))
	}

	createTeamsObject(teamsObject) {
		let objectFullOfTeams = {}
		teamsObject.forEach(team => objectFullOfTeams[team._id] = `${team.name} - ${team.division}`)
		return objectFullOfTeams;
	}

	
	render() {
		// let teamSelect = this.props.teams.length > 0 ? <Field component={Select} options={this.createTeamsObject(this.props.teams)} name="home" /> : 'loading';
		return (
			<form className="game-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
			<h3>Submit A Game</h3>
				<label htmlFor="home">Home Team</label>
				<Field component={Select} 
							selectInput="team-select"
							options={this.createTeamsObject(this.props.teams)}
							name="home"
				/>
				<label htmlFor="away">Away Team</label>
				<Field component={Select}
							selectInput="team-select"
							options={this.createTeamsObject(this.props.teams)}
							name="away"
				/>
				<label htmlFor="location">Location</label>
				<Field component={Select}
							selectInput="team-select"
							options={{'Garvey Ranch - Big': 'Garvey Ranch - Big', 'Garvey Ranch - Small': 'Garvey Ranch - Small', 'Sequoia': 'Sequoia Park', 'McKinley Elementary': 'McKinley Elementary', 'Vincent Lugo Park': 'Vincent Lugo Park', 'Lower La Loma': 'Lower La Loma', 'Upper La Loma': 'Upper La Loma', 'Sylmar Independent': 'Sylmar Independent', 'Live Oak Park': 'Live Oak Park', 'Ford Park': 'Ford Park', 'Veterans Park': 'Veterans Park', 'Diamond Bar': 'Diamond Bar', 'Duarte Sports Park': 'Duarte Sports Park', 'La Puente Park': 'La Puente Park'}}
							name="location"
				/>
				<label htmlFor="time">Date & Time</label>
				<Field component={renderDatePicker} name="time" />
				<button className="team-button" type="submit" disabled={this.props.pristine || this.props.submitting}>submit</button>
			</form>
		)
	}
}

const mapStateToProps = state => ({
	teams: state.team.teams
})

const afterSubmit = (result, dispatch) => dispatch(reset('game'))

GameForm = reduxForm({
	form: 'game',
	onSubmitSuccess: afterSubmit
})(GameForm);

export default connect(mapStateToProps)(GameForm)
