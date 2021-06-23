import React from 'react';
import { Gap } from "../../";

const CashierTableHeader = () => {
    return (
        <div className="products-table-header">
            <div className="products-table-header-content">
                <p>No</p>
            </div>
            <Gap width={10} />
            <div className="products-table-header-content">
                <p>Name</p>
            </div>
            <Gap width={10} />
            <div className="products-table-header-content">
                <p>Price</p>
            </div>
            <Gap width={10} />
            <div className="products-table-header-content">
                <p>Qty</p>
            </div>
            <Gap width={10} />
            <div className="products-table-header-content">
                <p>Total</p>
            </div>
        </div>
    )
}

export default CashierTableHeader
