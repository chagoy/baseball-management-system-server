import React from 'react';
import { connect } from 'react-redux';
import { getAllTeams } from '../actions/teams';
import { assignTeam } from '../actions/players';
import { Field, reduxForm } from 'redux-form';
import Select from './select';
import './players-table.css';

export class PlayerTeam extends React.Component {
	componentDidMount() {
		return this.props.dispatch(getAllTeams());
	}

	handleChange(e) {
		let team = e.target.value;
		let player = this.props.player;
		return this.props.dispatch(assignTeam({player, team}))
	}

	render() {
		const teams = this.props.teams.map(team => <option value={team.id}>{team.name} - {team.division}</option>);
		
		return (
			<form>
				<select name='team' defaultValue={this.props.team} onChange={e => this.handleChange(e)}>
					<option>New Team</option>
					{teams ? teams : 'loading'}
				</select>
			</form>
		)
	}
}

const mapStateToProps = state => ({
	teams: state.team.teams
})

export default connect(mapStateToProps)(PlayerTeam)