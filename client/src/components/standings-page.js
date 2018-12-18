import React from 'react';
import { connect } from 'react-redux';
import { fetchStandings } from '../actions/teams';
import StandingsRow from './standings-row';
require('./standings.css');

export class StandingsPage extends React.Component {
	componentDidMount() {
		return this.props.dispatch(fetchStandings())
	}

	render() {
		const shetland = this.props.standings.shetland ? 
			this.props.standings.shetland.map((team, index) => <StandingsRow key={index} team={team} /> )
		: 'loading';
		const pinto = this.props.standings.pinto ? 
			this.props.standings.pinto.map((team, index) => <StandingsRow key={index} team={team} /> )
		: 'loading';
		const mustang = this.props.standings.mustang ? 
			this.props.standings.mustang.map((team, index) => <StandingsRow key={index} team={team} /> )
		: 'loading';
		const bronco = this.props.standings.bronco ? 
			this.props.standings.bronco.map((team, index) => <StandingsRow key={index} team={team} /> )
		: 'loading';
		return (
			<div className='standings-container'>
				<h2>Standings</h2>
				<table>
					<tr className='header-row'>
						<th>Team</th>
						<th>Wins</th>
						<th>Losses</th>
						<th>Draws</th>
						<th>Games Back</th>
					</tr>
					<tr>
						<td colspan='5'>
							Shetland
						</td>
					</tr>
					{shetland}
					<tr>
						<td colspan='5'>
							Pinto
						</td>
					</tr>
					{pinto}
					<tr>
						<td colspan='5'>
							Mustang
						</td>
					</tr>
					{mustang}
					<tr>
						<td colspan='5'>
							Bronco
						</td>
					</tr>
					{bronco}
				</table>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	standings: state.team.standings
});

export default connect(mapStateToProps)(StandingsPage)