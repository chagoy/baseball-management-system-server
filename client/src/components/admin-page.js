import React from 'react';
import { connect } from 'react-redux';
import { downloadCSV } from '../actions/players'
import PlayersTable from './players-table';
import { Redirect, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config'
require('./admin-page.css');

export class AdminPage extends React.Component {

	render() {
		if (!this.props.loggedIn) {
			return <Redirect to='/' />;
		}

		let baseUrl = API_BASE_URL || 'http://localhost:5000/api/players/csv/';

		return (
			<div className="admin-view">
				<a href={baseUrl + this.props.user.id}>Export to CSV</a>
				<PlayersTable />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null,
	user: state.auth.currentUser,
	players: state.protectedData.players
});

export default connect(mapStateToProps)(AdminPage)