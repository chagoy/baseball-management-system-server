import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Select from './select';
import { updateDivision } from '../actions/players';

export class DivisionForm extends React.Component {
	onSubmit(values) {
		return this.props.dispatch(updateDivision(this.props.id, values));
	}

	render() {
		return (
			<form
				className="form" 
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
					<label for="division">Change Division</label>
					<Field placeholder={this.props.division} 
								component={Select} 
								selectInput='team-select'
								name="division" 
								options={{shetland: 'Shetland 6U', pinto: 'Pinto 8U', mustang: 'Mustang 10U', bronco: 'Bronco 12U', pony: 'Pony 14u'}} />
					<button type="submit" className='team-button'>Change</button>
				</form>
		);
	}
}


export default reduxForm({
	form: 'division',
	// onSubmitFail: (errors, dispatch) => dispatch(focus('player', Object.keys(errors)[0]))
})(DivisionForm)