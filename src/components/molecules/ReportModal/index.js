import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Gap } from "../../"

const ReportModal = ({ item, onHide }) => {
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
                        Detail Transaction
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>ID Transaction</p>
                    <input type="text" disabled value={item.id} />
                    <Gap height={10} />
                    <p>Total Item</p>
                    <input type="text" disabled value={item.totalItem}/>
                    <Gap height={10} />
                    <p>Items</p>
                    <ul>
                        {item.products.map((item, index) => (
                        <li>{item.qty} X {item.name}({item.price}) = {item.price*item.qty}</li> 
                        ))} 
                    </ul>
                    <Gap height={10} />
                    <p>Total Price</p>
                    <input type="text" disabled value={item.totalPrice} />
                    <Gap height={10} />
                    <p>Amount</p>
                    <input type="text" disabled value={item.amount} />
                    <Gap height={10} />
                    <p>Change</p>
                    <input type="text" disabled value={item.change} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" style={{width: "100%"}} onClick={onHide}>Done</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ReportModal
