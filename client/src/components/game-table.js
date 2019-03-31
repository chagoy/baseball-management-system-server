import React from 'react';
import { connect } from 'react-redux';
import { fetchAllGames } from '../actions/games';
import { Container, Table } from 'semantic-ui-react';
import GameRow from './game-row';

export class GameTable extends React.Component {
    componentDidMount() {
        return this.props.dispatch(fetchAllGames());
    }
    render() {
        let edit;
        let games = this.props.games.length > 0 ? this.props.games.map((game, index) => <GameRow user={this.props.user ? this.props.user.admin : false} key={ index } game={ game }/>) : 'No games on the schedule';

        if (this.props.user) {
            if (this.props.user.admin) {
                edit = <Table.HeaderCell>Edit</Table.HeaderCell>;
            }
        }

        return (
            <Container>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                Date
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Time
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Division
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Home 
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Away
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Location
                            </Table.HeaderCell>
                            {edit}
                        </Table.Row>
                    </Table.Header>
                    {games}
                </Table>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.currentUser,
    games: state.game.games
});

export default connect(mapStateToProps)(GameTable)