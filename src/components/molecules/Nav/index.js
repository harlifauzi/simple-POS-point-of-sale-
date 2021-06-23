import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Firebase } from '../../../configs';
import moment from "moment";

const Nav = () => {
    const history = useHistory();
    const [ day, setDay ] = useState(moment().format('dddd'));
    const [ date, setDate ] = useState(moment().format('LL'));

    const signOut = () => {
        Firebase.auth().signOut();
        alert('Log out successful!');
        history.push("/login");
    }

    return (
        <div className="nav">
            <p className="nav-logout" onClick={signOut}>Logout</p>
            <div>
                <p className="nav-greeting">Hello</p>
                <p className="nav-date">{day}, {date}</p>
            </div>
        </div>
    )
}

export default Nav
