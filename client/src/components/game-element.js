import React from 'react';
import {Link} from 'react-router-dom';
import GameModal from './game-modal';
import SemanticModal from './semantic-modal';
import { Grid, Responsive, Container, Item, Icon, Search, Button, Image, Segment, Divider, Header, Table, Message, Label } from 'semantic-ui-react';
import moment from 'moment';

export default function GameElement(props) {
	let color = '';

	let admin = props.user;
	console.log(`before the try catch ${admin}`)
	if (props.game) {
		switch(props.game.home.division.toLowerCase()) {
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

	console.log(props.game.time);

	return (
		<Segment textAlign='center'>
			<Label color={color} attached='top'>
			{props.game.home.division.toUpperCase()}
			</Label>
			<Header>
				<Header.Content>
					<Image src={props.game.away.logo} size='mini' avatar /> 
						{props.game.away.name} {typeof props.game.awayScore === 'number' ? props.game.awayScore : ''} vs {props.game.home.name} {typeof props.game.homeScore === 'number' ? props.game.homeScore : ''}
					<Image src={props.game.home.logo} size='mini' avatar/>
				</Header.Content>
			</Header>
			<p>{moment.utc(props.game.time).local().format("dddd, MMMM Do")}</p>
			<p>{moment.utc(props.game.time).local().format("h:mm a")}</p>
			<p>{props.game.location}</p>
			{ admin ? <SemanticModal color={color} game={props.game}/> : '' }
		</Segment>
	)
}