import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


export default function AddMedicineModal(props) {
    let medicine = "";
    const setMedicine = (value) => {medicine = value}

    return (
      <>          
        <Modal         
                show={props.show}
                onHide={props.onClose}
                backdrop="static"
                keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить Препарат</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <input onChange={event => setMedicine(event.target.value)} type='text' />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => props.onClose()}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={() => props.onSubmit(medicine)}>
              Добавить
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  