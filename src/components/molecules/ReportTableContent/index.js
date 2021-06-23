import React from 'react'
import { Gap } from "../../"

const ReportTableContent = ({ no, item, onClick }) => {
    return (
        <div className="products-table-list" onClick={onClick}>
            <div className="products-table-list-content-number">
                <p>{no + 1}</p>
            </div>
            <Gap width={10} />
            <div className="products-table-list-content">
                <p>{item.id}</p>
            </div>
        </div>
    )
}

export default ReportTableContent
