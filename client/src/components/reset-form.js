import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from './input';
import { resetPassword } from '../actions/auth'

export class ResetForm extends React.Component {
	onSubmit(values) {
		this.props.dispatch(resetPassword(values));
	}

	render() {
		return (
			<form className="reset-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label htmlFor='email'>Enter the email you registered with</label>
				<Field component={Input}
					inputClass='email-input'
					type='text'
					name='email' />
				<button type='submit' className='reset-button' disabled={this.props.pristine || this.props.submitting}>Submit</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'reset'
})(ResetForm);