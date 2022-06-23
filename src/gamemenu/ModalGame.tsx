import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ModalGame(props:any){
    const [show, setShow] = useState(true);
    const history = useNavigate()

    return(
        <Modal show={show} onHide={()=>history('/game')}>
            <Modal.Header>
            <Modal.Title>Game not founded</Modal.Title>
            </Modal.Header>
            <Modal.Body>Game not found, redirecting to games</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>history('/menu')}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
}