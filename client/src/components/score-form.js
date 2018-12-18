import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import Input from './input';
import { updateScores } from '../actions/games';

class ScoreForm extends React.Component {
	onSubmit(values) {
		let id = this.props.singleGame._id;
		let homeId = this.props.singleGame.home._id;
		let awayId = this.props.singleGame.away._id;
		let gameAndTeams = {id, homeId, awayId};

		return this.props.dispatch(updateScores({...values, ...gameAndTeams}));
	}

	render() {
		return (
			<form className='update-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label htmlFor='home'>{this.props.singleGame.home.name}</label>
				<Field 
					component={Input}
					inputClass='team-input'
					type='text'
					name='homeScore'
				/>
				<label htmlFor='away'>{this.props.singleGame.away.name}</label>
				<Field
					component={Input}
					inputClass='team-input'
					type='text'
					name='awayScore'
				/>
				<button className='team-button' type='submit' disabled={this.props.pristine || this.props.submitting}>Submit</button>
			</form>
		)
	}
}

const mapStateToProps = state => ({
	game: state.game
})

const afterSubmit = (result, dispatch) => dispatch(reset('score'));

ScoreForm = reduxForm({
	form: 'score',
	onSubmitSuccess: afterSubmit
})(ScoreForm)

export default connect(mapStateToProps)(ScoreForm)