import React, { useEffect, useState } from 'react';
import { Nav, Gap, CashierTableHeader, CashierTableContent, CashierModal } from "../../components";
import { Button } from 'react-bootstrap';
import { Firebase } from '../../configs';
import { v4 as uuidv4 } from "uuid";

const Cashier = () => {
    const [ inputID, setInputID ] = useState("");
    const [ inputName, setInputName ] = useState("");
    const [ inputPrice, setInputPrice ] = useState("");
    const [ inputQty, setInputQty ] = useState("");
    const [ inputTotal, setInputTotal ] = useState("");
    const [ inputDisable, setInputDisable ] = useState(false);
    const [ inputIDDisable, setInputIDDisable ] = useState(false);
    const [ inputedProducts, setInputedProducts ] = useState([]);
    const [ renderList, setRenderList ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const [ totalPrice, setTotalPrice ] = useState("");
    const [ amount, setAmount ] = useState("");
    const [ change, setChange ] = useState("");

    const handleKeyPress = (e) => {
        if ( e.key === 'Enter'){
            Firebase.database().ref(`products/${inputID}`).once('value')
                .then(res => {
                    if ( res.val() ){
                        const product = res.val();
                        setInputName(product.name);
                        setInputPrice(product.price);
                        setInputIDDisable(true);
                        setInputDisable(false);
                        setInputQty("1");
                    } else {
                        alert("invalid ID!")
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const onClear = () => {
        setInputIDDisable(false);
        setInputID("");
        setInputName("");
        setInputPrice("");
        setInputTotal("");
        setInputQty("");
        setInputDisable(true)
    }

    const onInput = () => {
        Firebase.database().ref(`products/${inputID}`).once('value')
            .then(res => {
                if ( res.val() ){
                    setRenderList(false);
                    const product = res.val();
                    const newStock = parseInt(product.stock) - parseInt(inputQty);
                    Firebase.database().ref(`products/${inputID}/stock`).set(newStock);
                    setInputedProducts([...inputedProducts, {
                        id: inputID,
                        name: inputName,
                        price: inputPrice,
                        qty: inputQty,
                        total: inputTotal
                    }])
                    onClear();
                    setRenderList(true);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onPay = () => {
        const id = uuidv4(); 
        const products = inputedProducts;
        let total = 0; 
        inputedProducts.map(item => {
            total = total + parseInt(item.price*item.qty);
        });
        setTotalPrice(total);
        const totalItem = products.length;
        console.log({ id, products, total, totalItem });
        setShowModal(true);
    }

    const onNext = () => {
        const id = uuidv4(); 
        const products = inputedProducts;
        let total = 0; 
        inputedProducts.map(item => {
            total = total + parseInt(item.price*item.qty);
        });
        setTotalPrice(total);
        const totalItem = products.length;
        console.log({ id, products, total, totalItem });

        const data = {
            id,
            products,
            totalItem,
            totalPrice: total,
            amount,
            change
        }
        Firebase.database().ref(`transactions/${id}/`).set(data)
            .then(res => {
                alert('Transaction successful!');
                setInputedProducts([]);
                setShowModal(false);
            })
            .catch(err => {
                alert('Transaction failed!');
                console.log(err);
            })
    }

    useEffect(() => {
        if ( inputQty < 1 ) {
            setInputDisable(true)
            setInputTotal("");
        } else {
            setInputDisable(false)
            setInputTotal(parseInt(inputQty) * parseInt(inputPrice));
        }
    }, [inputQty])

    return (
        <div className="myContainer">
            <Nav />
            <Gap height={100} />
            <p>Products Table</p>
            <Gap height={10} />
            <div className="cashier-wrapper">
                <div className="cashier-left">
                    <div className="cashier-list-product">
                        <CashierTableHeader />
                        <Gap height={20} />
                        { inputedProducts.length > 0 && renderList && inputedProducts.map((item, index) => (
                        <div key={index}>
                            <CashierTableContent index={index} item={item} />
                            <Gap height={10} />
                        </div>
                        ))}
                        
                    </div>
                    <div className="cashier-button-group">
                        <Button variant="success" disabled={ inputedProducts.length > 0 ? false : true} onClick={onPay}>Pay</Button>
                    </div>
                </div>
                <Gap width={10} />
                <div className="cashier-right">
                    <div className="cashier-input-item">
                        <p className="cashier-input-item-title">Input Item</p>
                        <Gap height={20} />
                        <input type="text" placeholder="ID" value={inputID} onChange={e => setInputID(e.target.value)} onKeyPress={e => handleKeyPress(e)} disabled={inputIDDisable} />
                        <Gap height={10} />
                        <input type="text" placeholder="Name" value={inputName} onChange={e => setInputName(e.target.value)} disabled />
                        <Gap height={10} />
                        <input type="text" placeholder="Price" value={inputPrice} onChange={e => setInputPrice(e.target.value)} disabled />
                        <Gap height={10} />
                        <input type="text" placeholder="Qty" value={inputQty} onChange={e => setInputQty(e.target.value)} disabled={!inputIDDisable} />
                        <Gap height={10} />
                        <input type="text" placeholder="Total" value={inputTotal} onChange={e => setInputTotal(e.target.value)}disabled />
                        <Gap height={10} />
                        <div style={{display: 'flex'}}>
                            <Button variant="info" onClick={onClear}>Clear</Button>
                            <Gap width={10} />
                            <Button variant="success" disabled={inputDisable} onClick={onInput}>Input</Button>
                        </div>
                    </div>
                </div>
            </div>

            { showModal && 
            <CashierModal 
                onNext={onNext}
                total={totalPrice}
                amount ={amount}
                change={change}
                onChangeTotal={e => setTotalPrice(e.target.value)}
                onChangeAmount={e => setAmount(e.target.value)}
                setChange={() => setChange(parseInt(amount) - parseInt(totalPrice))}
            />
            }
        </div>
    )
}

export default Cashier
