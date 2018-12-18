import React from 'react';
import { connect } from 'react-redux'
import { togglePaid } from '../actions/players';

export class PayConfirm extends React.Component {
	handleClick(event) {
		event.preventDefault();
		this.props.dispatch(togglePaid(this.props.id, this.props.paid))
		let paid = document.getElementById(this.props.id);
		paid.value = paid.value === 'true' ? paid.innerText = 'false' : paid.innerText = 'true';
	}
	render() { 
		let paid = this.props.paid ? 'true' : 'false';
		return (
			<span className={paid} id={this.props.id} onClick={e => this.handleClick(e)}>
				{paid}
			</span>
		)
	}
}

export default connect()(PayConfirm)