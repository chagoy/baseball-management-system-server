import React from 'react';
import { Link } from 'react-router-dom';

export default function StandingsRow(props) {
	return (
		<tr className='team-row'>
			<td className='team-name'><span className='name-span'>{props.team.logo ? <img src={props.team.logo} className='standings-logo' /> : ''} <Link to={`/team/${props.team._id}`} >{props.team.name}</Link></span></td>
			<td>{props.team.wins}</td>
			<td>{props.team.losses}</td>
			<td>{props.team.draws}</td>
			<td>{props.team.gamesBack}</td>
		</tr>
	)
}