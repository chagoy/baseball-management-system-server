import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Header, Image } from 'semantic-ui-react';

export default function StandingsRow(props) {
	let teamName = '';
	if (props.user && props.user.admin) {
		console.log('props.user exists')
		teamName = (<Link to={`/team/${props.team._id}`}>{props.team.name}</Link>)
	} else {
		teamName = props.team.name
	}

	return (
		<Table.Row>
			<Table.Cell>
				<Header as='h4' image>
					<Image src={props.team.logo} size='mini' />
					<Header.Content>
						{teamName}
					</Header.Content>
				</Header>
			</Table.Cell>
			<Table.Cell>
				{props.team.wins}
			</Table.Cell>
			<Table.Cell>
				{props.team.losses}
			</Table.Cell>
			<Table.Cell>
				{props.team.draws}
			</Table.Cell>
			<Table.Cell>
				{props.team.gamesBack}
			</Table.Cell>
		</Table.Row>
	)
}
