import React, { useState } from 'react';
import Modal from 'react-modal';
import classes from './ApiKeyModal.module.css';

const ApiKeyModal = ({ isOpen, onRequestClose, onSave }) => {
  const [apiKey, setApiKey] = useState('');

  const handleChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSave = () => {
    onSave(apiKey);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Enter API Key"
      className={classes.modal}
      overlayClassName={classes.overlay}
    >
      <h2>Enter API Key</h2>
      <input
        type="text"
        value={apiKey}
        onChange={handleChange}
        placeholder="API Key"
        className={classes.input}
      />
      <button onClick={handleSave} className={classes.button}>
        Save
      </button>
    </Modal>
  );
};

export default ApiKeyModal;
