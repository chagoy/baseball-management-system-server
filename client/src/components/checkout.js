import React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import PAYMENT_SERVER_URL from '../server';
import {registerPlayer} from '../actions/players';
import {Redirect} from 'react-router-dom';

class InjectedCheckoutForm extends React.Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.state = {
			complete: false,
			name: ''
		};
	}

	handleChange = (e) => this.setState({name: e.currentTarget.value});

	async submit(ev) {
		const { name } = this.state;
		let {token} = await this.props.stripe.createToken({name: name});
		console.log(token)
		let response = await fetch(`${PAYMENT_SERVER_URL}/api/stripe`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.props.authToken}`
			},
			body: JSON.stringify({token})
		});

		if (response.ok) {
			this.setState({complete: true});
		}
	}

	render() {
		if (this.state.complete) return <Redirect to ='dashboard' />;
		const { name } = this.state;

		return (
			<div className='checkout'>
				<input name='name' onChange={this.handleChange} value={name} placeholder='card holder name'/>
				<CardElement />
				<button className="player-button" onClick={this.submit} disabled={this.props.disabled}>Send</button>
			</div>
		)
	}
}

export default injectStripe(InjectedCheckoutForm)