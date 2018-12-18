import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import ScoreForm from './score-form';

const customStyles = {
	content: {
		width: '50%',
		height: '50%',
		margin : '0 auto',
	}
}

export default class GameModal extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleOpenModal() {
		this.setState({ showModal: true });
	}

	handleCloseModal() {
		this.setState({ showModal: false });
	}

	render() {
		return (
			<div>
				<button className='edit-scores' onClick={this.handleOpenModal}>Edit Scores</button>
				<Modal isOpen={this.state.showModal} contentLabel='Scores' style={customStyles}>
					<h3>Update Game Score</h3>
					<ScoreForm singleGame={this.props.game} />
					<button onClick={this.handleCloseModal}>Close</button>
				</Modal>
			</div>
		)
	}
}