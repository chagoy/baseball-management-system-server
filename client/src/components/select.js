import React from 'react';

export const Select = props => {
	const renderSelectOptions = (key, index) => {
		return (
			<option key={`${index}-${key}`}
					value={key}
			>
				{props.options[key]}
			</option>
		);
	}

	if (props && props.options) {
		return (
			<div className="">
				<div className="">{props.label}</div>
				<select {...props.input} className={props.selectInput}>
					<option value="">Select</option>
						{Object.keys(props.options).map(renderSelectOptions)}
				</select>
			</div>
		)
	}
	return <div></div>
}

export default Select;