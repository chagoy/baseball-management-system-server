import React from 'react';
import {connect} from 'react-redux';
import { fetchProtectedData } from '../actions/protected-data';
import { fetchAllPlayers } from '../actions/players'
import PayConfirm from './pay-confirm';
import {Link} from 'react-router-dom';
import PlayerTeam from './player-team'
import './players-table.css'

export class PlayersTable extends React.Component {
	componentDidMount() {
		return this.props.dispatch(fetchAllPlayers());
	}

	render() {

		const players = this.props.players ? this.props.players.map((player, index) => 
			<tr key={index}>
				<td>{player.sport}</td>
				<td><Link to={`/player/${player.id}`}>{player.fullName}</Link></td>
				<td>{player.month}/{player.day}/{player.year}</td>
				<td>{player.playingAge}</td>
				<td>{player.certificate ? <a href={player.certificate}>Yes</a> : 'No'}</td>
				<td>{player.jersey ? player.jersey.toUpperCase() : 'none'}</td>
				<td>{player.team ? player.team.name : 'no team'}</td>
				<td>{player.team ? player.team.division : player.division}</td>
				<td><PlayerTeam key={index} player={player.id} team={player.team} /></td>
				<td>{player.request ? player.request : 'n/a'}</td>
				<td><PayConfirm key={index} id={player.id} paid={player.paid} /></td>
			</tr>
			) : 'waiting';
		return (
			<div className="flex-row">
				<table className="table">
					<thead>
						<tr>
							<th>Sport</th>
							<th>Name</th>
							<th>Date of Birth</th>
							<th>Playing Age</th>
							<th>Birth Certificate?</th>
							<th>Jersey</th>
							<th>Team</th>
							<th>Division</th>
							<th>Select</th>
							<th>Request</th>
							<th>Paid?</th>
						</tr>
					</thead>
					<tbody>{players}</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null,
	players: state.player.players
});

export default connect(mapStateToProps)(PlayersTable);