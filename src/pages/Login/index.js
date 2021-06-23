import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Firebase } from '../../configs';
import { Spinner } from "react-bootstrap";
import { Gap } from "../../components"

const Login = () => {
    const history = useHistory();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ spinner, setSpinner ] = useState(false);

    const onLogin = () => {
        if ( email === "" || password === "") {
            alert("Please fill all the input!");
        } else {
            console.log({ email, password });
            setSpinner(true);
            Firebase.auth()
                .signInWithEmailAndPassword(email, password)
                    .then(res => {
                        setSpinner(false);
                        alert("login successfull!");
                        history.replace("/");
                    })
                    .catch(err => {
                        setSpinner(false);
                        if (err.code === "auth/user-not-found") {
                            alert("Oops, email not registered!");
                        } else if (err.code === "auth/invalid-email") {
                            alert("Oops, invalid email");
                        } else if (err.code === "auth/wrong-password") {
                            alert("Oops, wrong password!");
                        }
                    });
        }
    }

    return (
        <div className="myContainer center">
            <div className="form-auth-wrapper">
                <p onClick={() => history.push('/register')}>Register</p>
                <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                <div style={{height: "10px"}} />
                    <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <div style={{height: "10px"}} />
                <button className="button-base ripple" onClick={onLogin}>Login{ spinner && <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />}</button>
            </div>
        </div>
    )
}

export default Login
