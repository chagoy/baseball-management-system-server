import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import { Form, Select, Button, Input, Header } from 'semantic-ui-react';
import { updateTeam } from '../actions/teams';

class TeamEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wins: 0,
            losses: 0,
            draws: 0,
            id: ''
        }
    }

    handleChange = (e, {name, value}) => {
        this.setState({ 
            [name]: value, 
            id: this.props.team._id 
        })
    }

    onSubmit() {
        return Promise.all([
            this.props.dispatch(updateTeam(this.state))
        ])
    }

    render() {
        const { wins, losses, draws } = this.state;
        return (
            <React.Fragment>
                <Header as='h3'>Edit Record</Header>
                <Form onSubmit={this.props.handleSubmit((values) => this.onSubmit(values))}>
                    <Form.Field>
                        <label>Wins</label> 
                        <Input onChange={this.handleChange} name='wins' value={this.wins} placeholder={this.props.team.wins} />
                    </Form.Field>
                    <Form.Field>
                        <label>Losses</label> 
                        <Input onChange={this.handleChange} name='losses' value={this.losses} placeholder={this.props.team.losses} />
                    </Form.Field>
                    <Form.Field>
                        <label>Draws</label> 
                        <Input onChange={this.handleChange} name='draws' value={this.draws} placeholder={this.props.team.draws} />
                    </Form.Field>
                    <Button color='red'>Submit</Button>
                </Form>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentuser !== null,
	players: state.player.players,
	team: state.team.team,
	games: state.team.games
});

TeamEdit = reduxForm({
    form: 'TeamEdit'
})(TeamEdit)

export default connect(mapStateToProps)(TeamEdit);