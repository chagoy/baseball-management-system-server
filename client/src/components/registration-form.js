import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import Radio from './radio';
import {Link} from 'react-router-dom';
import {required, nonEmpty, matches, length, isTrimmed, email, phoneNumber, zipCode} from '../validators';
const passwordLength = length({min: 6, max: 72});
const matchesPassword = matches('password');
const userNameLength = length({min: 4, max: 16});

export class RegistrationForm extends React.Component {
	onSubmit(values) {
		const {reset} = this.props;
		const { firstName, lastName, username, password, email, phone, texting, address, city, zipcode } = values;
		const user = { firstName, lastName, username, password, email, phone, texting, address, city, zipcode };
		return this.props.dispatch(registerUser(user))
				.then(() => this.props.dispatch(login(username, password)))
				.then(() => reset())
				.catch(err => console.log(err)) //dispatch to another action
	}

	render() {
		return (
			<form 
				role="registration-form"
				className="form register-form"
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
			)}>
				<h3 className="register-form-title">Register with Baseball & Softball</h3>
				<label htmlFor="firstName">First Name</label>
				<Field component={Input} 
						inputClass="register-input"
						type="text" 
						name="firstName" 
						validators={[required, nonEmpty, isTrimmed]} 
						warn={[required, nonEmpty]} 
				/>
				<label htmlFor="lastName">Last Name</label>
				<Field component={Input} 
						inputClass="register-input"
						type="text" 
						name="lastName" 
						validators={[required, nonEmpty, isTrimmed]} 
						warn={[required, nonEmpty]} 
				/>
				<label htmlFor="email">Email</label>
				<Field component={Input} 
						inputClass="register-input"
						type="text" 
						name="email" 
						validators={[required, nonEmpty, isTrimmed, email]} 
						warn={[required, email]} 
				/>
				<label htmlFor="phone">Phone Number</label>
				<Field component={Input} 
						inputClass="register-input"
						type="text" 
						name="phone" 
						validators={[required, isTrimmed, nonEmpty, phoneNumber]} 
						warn={[required, phoneNumber, isTrimmed, nonEmpty]} 
				/>

				<Field component={Radio}
					   name="texting"
					   label="Receive text messages?"
					   options={{Yes: 'Yes', No: 'No'}}
				/>
				<label htmlFor="address">Address</label>
				<Field component={Input} 
						inputClass="register-input"
						type="text" 
						name="address" 
						validators={[required, nonEmpty]} 
						warn={[required, nonEmpty]} 
				/>
				<label htmlFor="city">City</label>
				<Field component={Input} 
						inputClass="register-input"
						type="text" 
						name="city" 
						validators={[required, nonEmpty]} 
						warn={[required, nonEmpty]} 
				/>
				<label htmlFor="zip">Zip Code</label>
				<Field component={Input} 
						inputClass="register-input"
						type="text" 
						name="zipcode" 
						validators={[required, zipCode, nonEmpty]} 
						warn={[required, zipCode, nonEmpty]} 
				/>
				<label htmlFor="username">Username</label>
				<Field component={Input} 
						inputClass="register-input"
						type="text" 
						name="username" 
						validators={[required, isTrimmed, nonEmpty, userNameLength]}
						warn={[required, isTrimmed, nonEmpty, userNameLength]}
				/>
				<label htmlFor="password">Password</label>
				<Field component={Input} 
						inputClass="register-input"
						type="password" 
						name="password" 
						validators={[required, isTrimmed, nonEmpty, passwordLength]}
						warn={[required, isTrimmed, nonEmpty, passwordLength]}
				/>
				<label htmlFor="passwordConfirm">Confirm Password</label>
				<Field component={Input} 
						inputClass="register-input"
						type="password" 
						name="passwordConfirm" 
						validators={[required, isTrimmed, nonEmpty, matchesPassword, passwordLength]}
						warn={[required, isTrimmed, nonEmpty, matchesPassword, passwordLength]}
				/>
				<button className="register-button" type="submit" disabled={this.props.pristine || this.props.submitting}>
					Register
				</button>
				<p className="login-section">
					or <Link to="/login">log in</Link>
				</p>
			</form>
		);
	}
}

export default reduxForm({
	form: 'registration',
	onSubmitFail: (errors, dispatch) =>
		dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm)