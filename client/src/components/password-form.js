import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from './input';
import { saveNewPassword } from '../actions/auth'
import { required, isTrimmed, nonEmpty, matches, length } from '../validators';
const passwordLength = length({min: 6, max: 72});
const matchesPassword = matches('password');

export class PasswordForm extends React.Component {
	onSubmit(values) {
		let hash = this.props.hash
		
		return this.props.dispatch(saveNewPassword({...values, hash}));
	}

	render() {
		
		return (
			<form className="reset-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>

				<label htmlFor="password">Password</label>
				<Field component={Input} 
						inputClass="register-input"
						type="password" 
						name="password" 
						validators={[required, isTrimmed, nonEmpty, passwordLength]}
						warn={[required, isTrimmed, nonEmpty, passwordLength]}
				/>
				<label htmlFor="passwordConfirm">Confirm password</label>
				<Field component={Input} 
						inputClass="register-input"
						type="password" 
						name="passwordConfirm" 
						validators={[required, isTrimmed, nonEmpty, matchesPassword, passwordLength]}
						warn={[required, isTrimmed, nonEmpty, matchesPassword, passwordLength]}
				/>
				<button type='submit' className='reset-button' disabled={this.props.pristine || this.props.submitting}>Submit</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'password'
})(PasswordForm);