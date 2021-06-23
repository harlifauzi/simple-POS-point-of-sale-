import React, { useEffect, useState } from 'react'
import { Nav, Gap, ReportTableHeader, ReportTableContent, ReportModal } from "../../components"
import { Firebase } from '../../configs'

const Report = () => {
    const [ transactions, setTransactions ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ item, setItem ] = useState(null);

    const onView = (item) => {
        setItem(item);
        setShowModal(true);
    }

    const onHide = () => {
        setShowModal(false);
        setItem(null);
    }

    const getTransactions = () => {
        Firebase.database().ref("transactions/").once("value")
            .then(res => {
                if ( res.val() ){
                    const data = res.val();
                    console.log(data);
                    const temp = [];
                    Object.keys(data).map(item => {
                        temp.push(data[item]);
                    })
                    setTransactions(temp);
                    console.log(temp);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getTransactions();
    }, [])

    return (
        <div className="myContainer">
            <Nav />
            <Gap height={100} />
            <ReportTableHeader />
            <Gap height={20} />
            { transactions.length > 0 && transactions.map((item, index) => (
            <div key={index}>
                <ReportTableContent no={index} item={item} onClick={() => onView(item)} />
                <Gap height={10} />
            </div>
            ))}

            { showModal && 
            <ReportModal item={item} onHide={onHide} />
            }
        </div>
    )
}

export default Report
