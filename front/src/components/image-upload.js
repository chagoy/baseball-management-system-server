import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import FileInput from './file-input';

export class ImageUpload extends React.Component {
	onSubmit(values) {

	}

	render() {
		return (
			<form className="image-upload"
					onSubmit={this.props.handleSubmit(
						values => this.onSubmit(values)
						)}>
				<label htmlFor="certificate">Birth Certificate</label>
				<Field component={FileInput} name="certificate" />
				<button type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button>
			</form>
		)
	}
}

export default reduxForm({
	form: 'image'
})(ImageUpload)