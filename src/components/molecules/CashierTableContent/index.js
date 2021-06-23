import React from 'react'
import { Gap } from "../../"

const CashierTableContent = ({ index, item }) => {
    return (
        <div className="products-table-header">
            <div className="products-table-list-content">
                <p>{ index + 1 }</p>
            </div>
            <Gap width={10} />
            <div className="products-table-list-content">
                <p>{ item.name }</p>
            </div>
            <Gap width={10} />
            <div className="products-table-list-content">
                <p>{ item.price }</p>
            </div>
            <Gap width={10} />
            <div className="products-table-list-content">
                <p>{ item.qty }</p>
            </div>
            <Gap width={10} />
            <div className="products-table-list-content">
                <p>{ item.total }</p>
            </div>
        </div>
    )
}

export default CashierTableContent
