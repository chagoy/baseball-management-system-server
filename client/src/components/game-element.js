import React from 'react';
import {Link} from 'react-router-dom';
import GameModal from './game-modal';
require('./game-element.css');

export default function GameElement(props) {
	return (
		<div className='game-wrapper'>
			<div className='flex-row'>
				<div className='date-wrapper'>
					<p>{props.game.date}</p>
					<p>{props.game.realTime}</p>
					<p>{props.game.location}</p>
				</div>
			</div>
			<div className='flex-row'>
				<div className='flex-c-40'>
					<div className='logo-wrapper'>
						<img className='logo-element' src={props.game.away.logo}/>
						{props.game.awayScore ? <p className='remove score'>{props.game.awayScore}</p>: ''}
						<p className='remove'><Link to={`team/${props.game.away.id}`}>{props.game.away.nameAndDivision}</Link></p>
						<p className='remove record'>({props.game.away.record})</p>
					</div>
				</div>
				<div className='flex-c-20'>
					<div className='vs-wrapper'>
					{props.game.away.division}
						{props.game.completed ? <p className='remove'>Final</p> : ''} 
					</div>
				</div>
				<div className='flex-c-40'>
					<div className='logo-wrapper'>
						<img className='logo-element' src={props.game.home.logo}/>
						{props.game.homeScore ? <p className='remove score'>{props.game.homeScore}</p>: ''}
						<p className='remove'><Link to={`team/${props.game.home.id}`}>{props.game.home.nameAndDivision}</Link></p>
						<p className='remove record'>({props.game.home.record})</p>
					</div>
				</div>
			</div>
			{ props.admin ? <GameModal game={props.game} /> : '' }
		</div>
	)
}