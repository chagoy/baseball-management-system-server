import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Header, Image } from 'semantic-ui-react';

export default function StandingsRow(props) {
	return (
		<Table.Row>
			<Table.Cell>
				<Header as='h4' image>
					<Image src={props.team.logo} size='mini' />
					<Header.Content>
						<Link to={`/team/${props.team._id}`}>{props.team.name}</Link>
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
