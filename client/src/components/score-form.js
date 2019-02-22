import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
// import Input from './input';
import { updateScores } from '../actions/games';
import { Form, Input, Button, Label } from 'semantic-ui-react';

class ScoreForm extends React.Component {
	state = { homeScore: '', awayScore: '' };

	handleChange = (e, {name, value}) => {
		this.setState({ [name]: value })
	}

	onSubmit() {
		
		let id = this.props.singleGame._id;
		let homeId = this.props.singleGame.home._id;
		let awayId = this.props.singleGame.away._id;
		let gameAndTeams = {id, homeId, awayId};
		return this.props.dispatch(updateScores({...this.state, ...gameAndTeams}));
	}

	render() {
		return (
			<Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<Form.Field inline>
					<label>{this.props.singleGame.away.name}</label>
					<Input onChange={this.handleChange} name='awayScore' placeholder='Away team'/>
				</Form.Field>
				<Form.Field inline>
					<label>{this.props.singleGame.home.name}</label>
					<Input onChange={this.handleChange} name='homeScore' placeholder='Home team'/>
				</Form.Field>
				<Form.Field inline>
					<Label as='p' basic color={this.props.color}>{this.props.singleGame.home.division} -{this.props.singleGame.date}</Label>
				</Form.Field>
				<Button type='submit'>Submit</Button>
			</Form>
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