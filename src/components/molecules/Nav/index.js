import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Firebase } from '../../../configs';
import moment from "moment";

const Nav = () => {
    const history = useHistory();
    const [ day, setDay ] = useState(moment().format('dddd'));
    const [ date, setDate ] = useState(moment().format('LL'));
    const [ time, setTime ] = useState(moment().format('LTS'));

    const signOut = () => {
        Firebase.auth().signOut();
        alert('Log out successful!');
        history.push("/login");
    }

    const dynamicTime = () => {
        setTimeout(() => {
            setDay(moment().format('dddd'));
            setDate(moment().format('LL'));
            setTime(moment().format('LTS'));
        }, 1000)
        dynamicTime();
    }

    useEffect(() => {
        dynamicTime();
    }, [])

    return (
        <div className="nav">
            <p className="nav-logout" onClick={signOut}>Logout</p>
            <div>
                <p className="nav-greeting">Hello</p>
                <p className="nav-date">{day}, {date} | {time}</p>
            </div>
        </div>
    )
}

export default Nav
