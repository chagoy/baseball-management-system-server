import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import { createGame } from '../actions/games';
import { Form, Select, Button } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';

class GameForm2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            home: '',
            away: '',
            location: '',
            dateTime: ''
        }
    }

    handleChange = (e, {name, value}) => {
        this.setState({ [name]: value })
        console.log(this.state);
    }

    onSubmit() {
        console.log(this.state);
        return this.props.dispatch(createGame(this.state))
    }

    // [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }, ...{}]

    render() {
        let locations = [
            { key: 'grb', value: 'Garvey Ranch - Big', text: 'Garvey Ranch - Big'},
            { key: 'grs', value: 'Garvey Ranch - Small', text: 'Garvey Ranch - Small'},
            { key: 'seq', value: 'Sequoia Park', text: 'Sequoia Park'},
            { key: 'mck', value: 'McKinley Elementary', text: 'McKinley Elementary'},
            { key: 'vin', value: 'Vincent Lugo Park', text: 'Vincent Lugo Park'},
            { key: 'lll', value: 'La Loma Park - Lower', text: 'La Loma Park - Lower'},
            { key: 'ull', value: 'La Loma Park - Upper', text: 'La Loma Park - Upper'},
            { key: 'syl', value: 'Sylmar Independent', text: 'Sylmar Independent'},
            { key: 'lop', value: 'Live Oak Park', text: 'Live Oak Park'},
            { key: 'for', value: 'Ford Park', text: 'Ford Park'},
            { key: 'vet', value: 'Veterans Park', text: 'Veterans Park'},
            { key: 'dia', value: 'Diamond Bar', text: 'Diamond Bar'},
            { key: 'dua', value: 'Duarte Sports Park', text: 'Duarte Sports Park'},
            { key: 'pue', value: 'La Puente Park', text: 'La Puente Park'},
        ]

        let teams = this.props.teams.map(team => ({key: team.id, value: team._id, text: `${team.name} - ${team.division}`}));

        console.log(this.props.teams);

        console.log(teams);

        return (
            <React.Fragment>
                <h2>Add A Game</h2>
                <Form onSubmit={this.props.handleSubmit((values) => this.onSubmit(values))}>
                    <Form.Field inline>
                        <DateTimeInput
                            clearable
                            name='dateTime'
                            placeholder='Date and Time'
                            value={this.state.dateTime}
                            iconPosition='left'
                            onChange={this.handleChange}
                            dateTimeFormat='MM-DD-YYYY h:mm a'
                            timeFormat='ampm'
                        />
                    </Form.Field>
                    <Form.Field inline>
                        <Select name='location' onChange={this.handleChange} placeholder='where game at' options={locations}/>
                    </Form.Field>
                    <Form.Field inline>
                        <Select name='away' onChange={this.handleChange} placeholder='Away' options={teams}/>
                    </Form.Field>
                    <Form.Field inline>
                        <Select name='home' onChange={this.handleChange} placeholder='Home' options={teams}/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
	teams: state.team.teams
})

const afterSubmit = (result, dispatch) => dispatch(reset('Game2'));

GameForm2 = reduxForm({
	form: 'Game2',
	onSubmitSuccess: afterSubmit
})(GameForm2)

export default connect(mapStateToProps)(GameForm2)