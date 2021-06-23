import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Gap } from "../../"

const ProductModal = ({ onHide, onSave, onUpdate, onDelete, modalType, ID, Name, Stock, Price, onChangeID, onChangeName, onChangeStock, onChangePrice }) => {
    const [ currentModalType, setCurrentModalType ] = useState(modalType);
    
    return (
        <div>
            <Modal
                show
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={onHide}
                className="products-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        { currentModalType }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" disabled={ currentModalType === "Input New Product" ? false : true} placeholder="ID" value={ID} onChange={onChangeID} />
                    <Gap height={10} />
                    <input type="text" disabled={ currentModalType === "View Product" ? true : false} placeholder="Name" value={Name} onChange={onChangeName} />
                    <Gap height={10} />
                    <input type="text" disabled={ currentModalType === "View Product" ? true : false} placeholder="Stock" value={Stock} onChange={onChangeStock} />
                    <Gap height={10} />
                    <input type="text" disabled={ currentModalType === "View Product" ? true : false} placeholder="Price" value={Price} onChange={onChangePrice} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={onHide}>Cancel</Button>
                    { currentModalType === "View Product" && <Button variant="danger" onClick={onDelete} >Delete</Button> }
                    { currentModalType === "View Product" && <Button variant="success" onClick={() => {
                        setCurrentModalType("Edit Product");
                    }}>Edit</Button>}
                    { currentModalType === "Input New Product" && <Button variant="success" onClick={onSave}>Save</Button> }
                    { currentModalType === "Edit Product" && <Button variant="success" onClick={onUpdate} >Update</Button> }
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProductModal
