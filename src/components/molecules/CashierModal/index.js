import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Gap } from "../../"

const CashierModal = ({ onNext, total, amount, change, onChangeTotal, onChangeAmount, setChange }) => {
    const [ done, setDone ] = useState(false);

    const onDone = () => {
        setChange();
        setDone(true);
    }

    return (
        <div>
            <Modal
                show
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="products-modal"
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Payment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Total</p>
                    <input type="text" disabled value={total} />
                    <Gap height={10} />
                    <p>Amount</p>
                    <input type="text" disabled={done} value={amount} onChange={onChangeAmount} />
                    <Gap height={10} />
                    <p>Change</p>
                    <input type="text" disabled value={change} />
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={done} variant="success" style={{width: "100%"}} onClick={onDone}>Done</Button>
                    <Gap height={10} />
                    <Button disabled={!done} variant="info" style={{width: "100%"}} onClick={onNext}>Next Transaction</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CashierModal
