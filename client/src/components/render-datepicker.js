import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class renderDatePicker extends React.Component {
    static propTypes = {
        input: PropTypes.shape({
            onChange: PropTypes.func.isRequired,
            value: PropTypes.string.isRequired,
        }).isRequired,
        meta: PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.bool,
        }),
        placeholder: PropTypes.string
    }

    static defaultProps = {
        placeholder: ''
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(date) {
        this.props.input.onChange(moment(date))
    }

    render() {
        const { input, placeholder, meta: { touched, error }} = this.props;

        return (
            <div>
                <DatePicker
                    {...input}
                    dateFormat="MM-DD-YYYY h:mm a"
                    showTimeSelect
                    timeFormat="hh:mm a"
                    timeIntervals={15}
                    timeCaption="Time"
                    placeholder={placeholder}
                    selected={input.value ? moment(input.value) : null}
                    onChange={this.handleChange}
                />
                { touched && error && <span>{error}</span>}
            </div>
        )
    }
}

export default renderDatePicker;