import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import Input from './input';
import File from './file-input';
import Select from './select';
import { createTeam } from '../actions/teams';
import { required } from '../validators';

export class TeamForm extends React.Component {
	onSubmit(values) {
		return this.props.dispatch(createTeam(values));
	}

	render() {
		return (
			<form className="team-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<h3>Create A Team</h3>
				<label htmlFor="name">Team Name</label>
				<Field component={Input} 
							inputClass='team-input'
							type="text"
							validators={[required]}
							warn={[required]}
							name="name" />
				<label htmlFor="division">Division</label>
				<Field component={Select} 
							selectInput='team-select'
							name="division"
							validators={[required]}
							warn={[required]}
							options={{shetland: 'Shetland 6U', pinto: 'Pinto 8U', mustang: 'Mustang 10U', bronco: 'Bronco 12U', pony: 'Pony 14u'}} />
				<label className="label-control" htmlFor="Logo">Team Logo</label>
						<Field name="logo"
								component={File}
								fileClass="file-upload"
						/>
				<button type="submit" className="team-button" disabled={this.props.pristine || this.props.submitting}>Submit</button>
			</form>
		);
	}
}

const afterSubmit = (result, dispatch) => dispatch(reset('team'));

export default reduxForm({
	form: 'team',
	onSubmitSuccess: afterSubmit
})(TeamForm);