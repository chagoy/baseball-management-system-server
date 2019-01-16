import React from 'react';
import {Field} from 'redux-form';

export const Radio = props => {
	if (props && props.input && props.options) {
		const renderRadioButtons = (key, index) => {
			return (
				<label key={`${index}`} htmlFor={`${props.input.name}-${index}`}>
					<Field id={`${props.input.name}`}
				  className="radio"
					component="input"
					name={props.input.name}
					type="radio"
					value={key}
					/>
					{props.options[key]}
				</label>
			);
		};
		return (
			<div className="radio-control">
				<div className="radio-label">
					{props.label}
				</div>
				<div className="radio-buttons">
					{props.options && Object.keys(props.options).map(renderRadioButtons)}
				</div>
			</div>
		);
	}
	return <div></div>
}
export default Radio;