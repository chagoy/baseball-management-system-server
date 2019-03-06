import React from 'react';
import { connect } from 'react-redux';
import { fetchStandings } from '../actions/teams';
import StandingsRow from './standings-row';
import { Container, Table, Header, Item } from 'semantic-ui-react';

export class StandingsPage extends React.Component {
	componentDidMount() {
		return this.props.dispatch(fetchStandings())
	}

	render() {
		// const shetland = this.props.standings.shetland ? 
		// 	this.props.standings.shetland.map((team, index) => <StandingsRow key={index} team={team} /> )
		// : 'loading';
		const pinto = this.props.standings.pinto ? 
			this.props.standings.pinto.map((team, index) => <StandingsRow user={this.props.user} key={index} team={team} /> )
		: 'loading';
		const mustang = this.props.standings.mustang ? 
			this.props.standings.mustang.map((team, index) => <StandingsRow user={this.props.user} key={index} team={team} /> )
		: 'loading';
		const bronco = this.props.standings.bronco ? 
			this.props.standings.bronco.map((team, index) => <StandingsRow user={this.props.user} key={index} team={team} /> )
		: 'loading';
		const pony = this.props.standings.pony ? 
			this.props.standings.pony.map((team, index) => <StandingsRow user={this.props.user} key={index} team={team} /> )
		: 'loading';
		console.log(this.props.user);
		console.log(this.props.standings);
		return (
			<Container>
				<Header as='h2' textAlign='center'>Spring 2019 Standings</Header>
				<Table>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Team</Table.HeaderCell>
							<Table.HeaderCell>Wins</Table.HeaderCell>
							<Table.HeaderCell>Losses</Table.HeaderCell>
							<Table.HeaderCell>Draws</Table.HeaderCell>
							<Table.HeaderCell>Games Back</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Row>
						<Table.Cell colspan='5'>
							<Header as='h3'>Pinto</Header>
						</Table.Cell>
					</Table.Row>
					{pinto}
					<Table.Row>
						<Table.Cell colspan='5'>
							<Header as='h3'>Mustang</Header>
						</Table.Cell>
					</Table.Row>
					{mustang}
					<Table.Row>
						<Table.Cell colspan='5'>
							<Header as='h3'>Bronco</Header>
						</Table.Cell>
					</Table.Row>
					{bronco}
					<Table.Row>
						<Table.Cell colspan='5'>
							<Header as='h3'>Pony</Header>
						</Table.Cell>
					</Table.Row>
					{pony}
				</Table>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	standings: state.team.standings,
	user : state.auth.currentUser
});

export default connect(mapStateToProps)(StandingsPage)