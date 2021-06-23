import React from 'react'
import { Gap } from "../../"

const ReportTableHeader = () => {
    return (
        <div className="products-table-header">
            <div className="products-table-header-content-number">
                <p>No</p>
            </div>
            <Gap width={10} />
            <div className="products-table-header-content">
                <p>ID Transaction</p>
            </div>
        </div>
    )
}

export default ReportTableHeader
