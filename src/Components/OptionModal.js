import React from 'react';
import Modal from 'react-modal'

const OptionModal = (props)=>(
    <Modal
        isOpen={!!props.selectedOption}
        contentLabel='Selected Option'
        onRequestClose={props.handleModalClose}
    >
        <h3>Selected Option</h3>
        {props.selectedOption && <p>{props.selectedOption}</p>}
        <button onClick={props.handleModalClose}>Okay</button>
    </Modal>
)

export default OptionModal;

