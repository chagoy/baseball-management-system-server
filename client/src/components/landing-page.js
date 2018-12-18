import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
require('./landing-page.css')

export function LandingPage(props) {
	if (props.loggedIn) {
		return <Redirect to="/dashboard" />
	}

	return (
		<div className="background">
			<div className="flex-row">
				<header className="header">
					<h1 className="headline-text">MPK Baseball & Softball</h1>
					<p className="tagline">now accepting registrations for the spring 2019 season</p>
					<Link to={'/register'}>
						<button className="register-button">
							Register now
						</button>
					</Link>
					
				</header>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage)