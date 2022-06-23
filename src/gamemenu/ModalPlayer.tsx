import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ModalPlayer(props:any){
    const [show, setShow] = useState(true);
    const history = useNavigate()

    return(
        <Modal show={show} onHide={()=>history('/login')}>
            <Modal.Header>
            <Modal.Title>Player not founded</Modal.Title>
            </Modal.Header>
            <Modal.Body>Player not found, redirecting to login</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>history('/login')}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
}