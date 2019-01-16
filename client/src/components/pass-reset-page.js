import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PasswordForm from './password-form';
import {checkValidToken} from '../actions/auth';

export class PassResetPage extends React.Component {
	componentDidMount() {
		// GET to reset/:hash to make sure the token is valid
		if (this.props.loggedIn) {
			return <Redirect to='/dashboard' />
		}
		return this.props.dispatch(checkValidToken(this.props.match.params.hash))
	}

	render() {
		let showPasswordForm = this.props.error ? <p>{this.props.error}</p> : <PasswordForm hash={this.props.match.params.hash} />;
		return (
			<div>{showPasswordForm}</div>
		)
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null,
	validToken: state.auth.validToken !== null,
	error: state.auth.error
});

export default connect(mapStateToProps)(PassResetPage)