import React, { useEffect, useState } from 'react'
import { Nav, Gap, ProductModal } from "../../components"
import { Firebase } from '../../configs';

const Products = () => {
    const [ products, setProducts ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ modalType, setModalType ] = useState("");
    const [ ID, setID ] = useState("");
    const [ name, setName ] = useState("");
    const [ stock, setStock ] = useState("");
    const [ price, setPrice ] = useState("");

    const getProducts = () => {
        Firebase.database().ref('products/').on('value', snapshot => {
            if ( snapshot.val() ){
                const data = snapshot.val();
                const temp = [];
                console.log(data);
                Object.keys(data).map(item => {
                    console.log(data[item])
                    temp.push(data[item]);
                })
                console.log(temp);
                setProducts(temp);
            }
        })
            
    }

    const onSaveNewProduct = () => {
        if ( ID !== "" && name !== "" && stock !== "" && price !== "" ){
            console.log({ ID, name, stock, price });
            const newProduct = {
                id: ID,
                name: name,
                stock: stock,
                price: price
            };
            Firebase.database()
                .ref(`products/${ID}/`)
                .set(newProduct)
                .then(res => {
                    alert("Input new product successful!");
                    // setMessageType("success");
                    // setOpenSnackbar(true);
                    resetData();
                    setShowModal(false);
                })
                .catch(err => {
                    alert("Input new product failed!");
                    // setMessageType("error");
                    // setOpenSnackbar(true);
                });
        } else {
            alert("Please fill all input!");
        }
    }

    const onUpdateProduct = () => {
        if ( name !== "" && stock !== "" && price !== "" ){
            console.log({ ID, name, stock, price });
            const product = {
                id: ID,
                name: name,
                stock: stock,
                price: price
            };
            Firebase.database()
                .ref(`products/${ID}/`)
                .set(product)
                .then(res => {
                    alert("Update product successful!");
                    // setMessageType("success");
                    // setOpenSnackbar(true);
                    resetData();
                    setShowModal(false);
                })
                .catch(err => {
                    alert("Update product failed!");
                    // setMessageType("error");
                    // setOpenSnackbar(true);
                });
        } else {
            alert("Please fill all input!");
        }
    }

    const onDeleteProduct = () => {
        Firebase.database().ref(`products/${ID}/`).remove()
            .then(res => {
                alert("Delete product successful!");
                resetData();
                setShowModal(false);
            })
            .catch(err => {
                alert("Delete product failed!");
                resetData();
                setShowModal(false);
            })
    }

    const resetData = () => {
        setID("");
        setName("");
        setStock("");
        setPrice("");
    }

    const onViewProduct = (item) => {
        setID(item.id);
        setName(item.name);
        setStock(item.stock);
        setPrice(item.price);
        setModalType("View Product");
        setShowModal(true);
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div className="myContainer">
            <Nav />
            <Gap height={100} />
            <div className="fsb">
                <p className="products-new" onClick={() => {
                    setModalType("Input New Product");
                    setShowModal(true);
                }}>Input new product</p>
                {/* <input type="text" placeholder="search" className="products-searchbar" /> */}
            </div>
            <Gap height={10} />
            <div className="products-table-header">
                <div className="products-table-header-content">
                    <p>No</p>
                </div>
                <Gap width={10} />
                <div className="products-table-header-content">
                    <p>ID</p>
                </div>
                <Gap width={10} />
                <div className="products-table-header-content">
                    <p>Name</p>
                </div>
                <Gap width={10} />
                <div className="products-table-header-content">
                    <p>Stock</p>
                </div>
                <Gap width={10} />
                <div className="products-table-header-content">
                    <p>Price</p>
                </div>
            </div>
            <Gap height={20} />

            { products && products.map((item, index) => (
            <div key={item.id}>
                <div className="products-table-list" onClick={() => onViewProduct(item)}>
                    <div className="products-table-list-content">
                        <p>{ index + 1 }</p>
                    </div>
                    <Gap width={10} />
                    <div className="products-table-list-content">
                        <p>{ item.id }</p>
                    </div>
                    <Gap width={10} />
                    <div className="products-table-list-content">
                        <p>{ item.name }</p>
                    </div>
                    <Gap width={10} />
                    <div className="products-table-list-content">
                        <p>{ item.stock }</p>
                    </div>
                    <Gap width={10} />
                    <div className="products-table-list-content">
                        <p>{ item.price }</p>
                    </div>
                </div>
                <Gap height={10} />
            </div>
            ))}

            { showModal && <ProductModal
                onHide={() => {
                    setShowModal(!showModal);
                    resetData();
                }}
                onSave={onSaveNewProduct}
                onUpdate={onUpdateProduct}
                onDelete={onDeleteProduct}
                modalType={modalType}
                ID={ID}
                Name={name}
                Stock={stock}
                Price={price}
                onChangeID={e => setID(e.target.value)}
                onChangeName={e => setName(e.target.value)}
                onChangeStock={e => setStock(e.target.value)}
                onChangePrice={e => setPrice(e.target.value)}
            />}

            
        </div>
    )
}

export default Products
