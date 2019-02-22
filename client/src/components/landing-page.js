import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
require('./landing-page.css')

export function LandingPage(props) {
	if (props.loggedIn) {
		return <Redirect to="/dashboard" />
	}

	return (
		<div className="landing-page-background">
			<div className="landing-page-flex-row">
				<header className="landing-page-header">
					<h1 className="landing-page-headline-text">MPK Baseball & Softball</h1>
					<p className="landing-page-tagline">now accepting registrations for the spring 2019 season</p>
					<Link to={'/register'}>
						<button className="landing-page-register-button">
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