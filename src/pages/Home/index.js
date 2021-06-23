import React from 'react'
import { Nav } from "../../components"
import { useHistory } from 'react-router'

const Home = () => {
    const history = useHistory();

    return (
        <div className="myContainer center">
            <Nav />
            <div className="home-grid-wrapper">
                <div className="home-grid-item" onClick={() => history.push('/products')}>
                    <p className="home-grid-item-title">Products</p>
                </div>
                <div className="home-grid-item" onClick={() => history.push('/report')}>
                    <p className="home-grid-item-title">Reports</p>
                </div>
                <div className="home-grid-item" onClick={() => history.push('/cashier')} >
                    <p className="home-grid-item-title">Cashier</p>
                </div>
            </div>
        </div>
    )
}

export default Home
