import React from 'react';
import { connect } from 'react-redux';
require('./league-page.css')

export class LeaguePage extends React.Component {

	render() {
		return (
			<div className='flex-wrap'>
				<div className='flex-c-60'>
					<h2>League History</h2>
					<p className='league-text'>MPK Baseball & Softball was founded in 2015 with the help of the local community and the families of Monterey Park and the surrounding cities. MPK gives back to the community through our baseball and softball programs.</p>
					<p className='league-text'>Our mission is to provide a safe, fun, and active environmment through the game of baseball and softball. Our grassroots programs are for boys and girls, ages 4-14 of all skill levels.</p>
					<p className='league-text'>Our programs foster and build character by teaching real life skills on and off the field. We have many focuses such as teamwork, sportsmanship, health and well-being, networking and building relationships, leadership, athleticism, and positive competitiveness as our children grow up to be young adults and leaders in the community.</p>
					<p>MPK Board</p>
					<h3>Want to get involved? Have a question?</h3>
					<p><a href="mailto:mpkbaseball15@gmail.com">Send us an email</a></p>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LeaguePage)