import React from 'react';
import ScoreForm from './score-form';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default function SemanticModal(props) {
	return (
		<Modal trigger={<Button>Edit Scores</Button>} closeIcon>
	    <Header icon='archive' content='Update Game Score' />
	    <Modal.Content>
	      <ScoreForm color={props.color} singleGame={props.game}/>
	    </Modal.Content>
	    {/* <Modal.Actions>
	      <Button color='red'>
	        <Icon name='remove' /> No
	      </Button>
	      <Button color='green'>
	        <Icon name='checkmark' /> Yes
	      </Button>
	    </Modal.Actions> */}
	  </Modal>
	)
}