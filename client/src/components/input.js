import React from 'react';

export default class Input extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }

    render() {
        let error;
        if (this.props.meta.touched && this.props.meta.error) {
            error = this.props.meta.error;
        }

        let warning;
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = this.props.meta.warning;
        }

        return (
            <div className={this.props.controlClass}>
                <label htmlFor={this.props.input.name}>
                    {this.props.label}
                </label>
                <input
                    className={error || warning ? 'errorClass' : this.props.inputClass}
                    placeholder={error || warning ? warning : ''}
                    aria-relevant='all'
                    aria-required='true'
                    aria-label={this.props.input.name}
                    {...this.props.input}
                    id={this.props.input.name}
                    type={this.props.type}
                    ref={input => (this.input = input)}
                />
                <p className="form-error">
                    {error}
                </p>
            </div>
        );
    }
}
