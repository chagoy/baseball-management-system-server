import React from 'react';
import {connect} from 'react-redux';
import { fetchProtectedData } from '../actions/protected-data';
import { fetchAllPlayers } from '../actions/players'
import PayConfirm from './pay-confirm';
import {Link} from 'react-router-dom';
import PlayerTeam from './player-team';
import { Table } from 'semantic-ui-react';

export class PlayersTable extends React.Component {
	
	componentDidMount() {
		return this.props.dispatch(fetchAllPlayers());
	}

	render() {
		const players = this.props.players ? this.props.players.map((player, index) => 
			<Table.Row key={index}>
				<Table.Cell>{player.sport}</Table.Cell>
				<Table.Cell><Link to={`/player/${player.id}`}>{player.fullName}</Link></Table.Cell>
				<Table.Cell>{player.month}/{player.day}/{player.year}</Table.Cell>
				<Table.Cell>{player.playingAge}</Table.Cell>
				<Table.Cell>{player.certificate ? <a href={player.certificate}>Yes</a> : 'No'}</Table.Cell>
				<Table.Cell>{player.jersey ? player.jersey.toUpperCase() : 'none'}</Table.Cell>
				<Table.Cell>{player.team ? player.team.name : 'no team'}</Table.Cell>
				<Table.Cell>{player.team ? player.team.division : player.division}</Table.Cell>
				<Table.Cell><PlayerTeam key={index} player={player.id} team={player.team} /></Table.Cell>
				<Table.Cell>{player.request ? player.request : 'n/a'}</Table.Cell>
				<Table.Cell><PayConfirm key={index} id={player.id} paid={player.paid} /></Table.Cell>
			</Table.Row>
			) : 'waiting';
		return (
			<div className="flex-row">
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Sport</Table.HeaderCell>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Date of BirTable.HeaderCell</Table.HeaderCell>
							<Table.HeaderCell>Playing Age</Table.HeaderCell>
							<Table.HeaderCell>BirTable.HeaderCell Certificate?</Table.HeaderCell>
							<Table.HeaderCell>Jersey</Table.HeaderCell>
							<Table.HeaderCell>Team</Table.HeaderCell>
							<Table.HeaderCell>Division</Table.HeaderCell>
							<Table.HeaderCell>Select</Table.HeaderCell>
							<Table.HeaderCell>Request</Table.HeaderCell>
							<Table.HeaderCell>Paid?</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{players}</Table.Body>
				</Table>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null,
	players: state.player.players
});

export default connect(mapStateToProps)(PlayersTable);