import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Segment, Label, Header } from 'semantic-ui-react';
// require('./player-card.css');

export default function PlayerCard(props) {
	let color = '';
	let admin = props.user;
	console.log(admin);

	if (props.player.team) {
		switch(props.player.team.division.toLowerCase()) {
			case 'shetland':
				color = 'red';
				break;
			case 'pinto':
				color = 'blue';
				break;
			case 'mustang':
				color = 'green';
				break;
			case 'bronco':
				color = 'yellow';
				break;
			case 'pony':
				color = 'brown';
				break;
		}
	}

	return (
		<Segment>
			<Label color={color} attached='top'>
				{ props.player.team ? props.player.team.division.toUpperCase() : 'NONE' }
			</Label>
			<Header>
				<Header.Content>
				<Link to={`/player/${props.player.id}`}>{props.player.fullName}</Link>
				</Header.Content>
			</Header>
			<p>Playing Age: { props.player.playingAge }</p>
			<p>Team: { props.player.team ? props.player.team.name : 'Player has no team' } </p>
		</Segment>
	)
}
