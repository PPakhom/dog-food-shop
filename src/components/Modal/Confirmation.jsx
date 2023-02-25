import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default ({show, setShow, setDelete}) => {
  
    const handleDelete = () => setDelete(true);
    const handleClose = () => setShow(false);

return (
    <div>
      <Modal  className='modalConfirm'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Внимание</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Удалить товар?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleDelete}>
                Удалить
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                Отмена
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}