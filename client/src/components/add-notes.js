import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { addNotes } from '../actions/players';
import Input from './input';

export class NotesForm extends React.Component {
	onSubmit(values) {
		return this.props.dispatch(addNotes(this.props.id, values.notes));
	}

	render() {
		return (
			<form className='form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label for='notes'>Add Notes</label>
				<Field component={Input}
								name='notes'
				/>
					<button type='submit' className='team-button'>Add</button>
			</form>
		)
	}
}

const afterSubmit = (result, dispatch) => dispatch(reset('team'));

export default reduxForm({
	form: 'notes',
	onSubmitSuccess: afterSubmit
})(NotesForm)