import React from 'react';

export const Checkbox = props => {
	return (
		<div className='checkbox'>
			<input { ...props.input } className='' type='checkbox' checked={props.input.value}/>
			<div className='checkbox-label'>{props.label}</div>
			<p className="form-error">
          {props.meta.error ? props.meta.error : ''}
      </p>
		</div>
	)
}

export default Checkbox;