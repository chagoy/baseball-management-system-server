import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ResetForm from './reset-form';

export function ResetPage(props) {
	if (props.loggedIn) {
		return <Redirect to='/dashboard' />
	}

	return (
		<div>
			<h1>Forgot your password?</h1>
			<p>Enter your password below and we'll send you an email with instructions to reset your password</p>
			<ResetForm />
		</div>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(ResetPage)