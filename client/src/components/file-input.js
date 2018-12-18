import React from 'react';
import Dropzone from 'react-dropzone';

const FILE_FIELD_NAME = 'files';

export default function File(props) {
	const files = props.input.value;
	return (
		<div>
			<Dropzone
				style={{"width" : "50%", "height" : "35px", "border" : "2px solid rgba(0, 0, 0, 0.7)", "margin": "0 auto"}}
				name={props.name}
				onDrop={( filesToUpload, e ) => props.input.onChange(filesToUpload)}
			>
				<div>Drop or Touch To Upload</div>
			</Dropzone>
			{props.meta.touched && props.meta.error && <span className='error'>{props.meta.error}</span>}
			{files && Array.isArray(files) && (
				<ul>
					{ files.map((file, i) => <li key={i}>{file.name}</li>) }
				</ul>
				)}
			</div>
	)
}