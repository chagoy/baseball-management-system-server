import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import GamesList from './games-list';
import { fetchProtectedData } from '../actions/protected-data';
import PlayerCard from './player-card';
require('./dashboard.css');

export class Dashboard extends React.Component {
	componentDidMount() {
		return this.props.dispatch(fetchProtectedData());
	}

	render() {
		if (!this.props.loggedIn) {
			return <Redirect to="/" />;
		};

		let playerCardData = this.props.players.length ? this.props.players.map((player, index) => {
			if (this.props.user.admin) {
				return (
					<Link key={index} to={`/player/${player.id}`}><PlayerCard key={index} player={player} admin={this.props.user.admin} /></Link>
				)
			}
			return <PlayerCard key={index} player={player} />;
		}) : 'You have no registered players';

		let adminLinks = this.props.user.admin ? (
			<div className='admin-links'>
				<Link to="/create" className="link">Admin Creation</Link>
				<Link to="/admin" className="link">Table View</Link>
			</div>
		) : '';

		return (
			<div className='dashboard'>
				{ adminLinks }
				<main className="dashboard-screen">
					<div className="flex-wrap">
						<div className="flex-row">
							<div className="flex-c-50">
								<h3 className='header-text'>Your Registered Players</h3>
								{playerCardData}
							</div>
							<div className="flex-c-50 games-column">
								<h3 className="header-text">Your Upcoming Schedule</h3>
								<GamesList />
							</div>
						</div>
					</div>
				</main>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null,
	user: state.auth.currentUser,
	players: state.protectedData.players
});

export default connect(mapStateToProps)(Dashboard);