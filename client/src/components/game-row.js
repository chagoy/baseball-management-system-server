import React from 'react';
import { Table, Image, Header } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import SemanticModal from './semantic-modal';

export default function GameRow(props) {
    let edit;
    if (props.user) {
        edit = <Table.Cell><SemanticModal game={props.game}/></Table.Cell>;
    }
    return (
        <Table.Row>
            <Table.Cell>
                {moment.utc(props.game.time).local().format("dddd, MMMM Do")}
            </Table.Cell>
            <Table.Cell>
                {moment.utc(props.game.time).local().format("h:mm a")}
            </Table.Cell>
            <Table.Cell>
                {props.game.division}
            </Table.Cell>
            <Table.Cell>
                <Header as='h4' image>
                    <Image src={props.game.home.logo} size='mini' />
                    <Header.Content>
                        <Link to={`/team/${props.game.home._id}`}>{props.game.home.name}</Link>
                        { props.game.completed ? ' ' + props.game.homeScore : '' }
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>
            <Header as='h4' image>
                    <Image src={props.game.away.logo} size='mini' />
                    <Header.Content>
                    <Link to={`/team/${props.game.away._id}`}>{props.game.away.name}</Link> 
                    { props.game.completed ? ' ' + props.game.awayScore : '' }
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>
                {props.game.location}
            </Table.Cell>
            {edit}
        </Table.Row>
    )
}