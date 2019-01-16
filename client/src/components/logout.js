import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import {logout} from '../actions/auth';
import {Link} from 'react-router-dom';

export class LogoutForm extends React.Component {
	handleClick(event) {
		// event.preventDefault();
		return this.props.dispatch(logout(this.props.currentUser));
	}

	render() {
		return (
				<Link className="link right-side-link" to="/" onClick={e => this.handleClick(e)}>Logout</Link>
		);
	}
}

export default reduxForm({
	form: 'logout'
})(LogoutForm)