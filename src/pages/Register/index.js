import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Firebase } from '../../configs';
import { Gap } from "../../components";
import { Spinner } from "react-bootstrap"

const Register = () => {
    const history = useHistory();
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ spinner, setSpinner ] = useState(false);

    const onRegister = () => {
        setSpinner(true);
        if ( firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === ""){
            setSpinner(false);
            alert("Please fill all input!");
            return;
        }
        if ( password !== confirmPassword ){
            setSpinner(false);
            alert("Password doesn't match!");
            return;
        }
        if ( password === confirmPassword && password !== "" && confirmPassword !== "" ){
            console.log({ firstName, lastName, email, password });
            Firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                    .then((res) => {
                        console.log("success: ", res);
                        const data = {
                            firstName,
                            lastName,
                            email
                        };
                        console.log(data);
                        Firebase.database()
                            .ref("employees/" + res.user.uid + "/")
                            .set(data);
                            setSpinner(false);
                            alert('Register successful!');
                            history.replace("/");
                    })
                    .catch((err) => {
                        if( err.code === "auth/invalid-email" ){
                            setSpinner(false);
                            alert("Oops, invalid email!")
                        } else if( err.code === "auth/email-already-in-use" ){
                            setSpinner(false);
                            alert("Oops, email already registered!")
                        } else if( err.code === "auth/weak-password" ){
                            setSpinner(false);
                            alert("Oops, minimal password length is 6 character!")
                        }
                        setSpinner(false);
                        alert("error: ", err);
                    });
        }
    }

    return (
        <div className="myContainer center">
            <div className="form-auth-wrapper">
                <p onClick={() => history.push('/login')}>Login</p>
                <input type="text" placeholder="first name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <Gap height={10} />
                <input type="text" placeholder="last name" value={lastName} onChange={e => setLastName(e.target.value)} />
                <Gap height={10} />
                <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                <Gap height={10} />
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <Gap height={10} />
                <input type="password" placeholder="confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <Gap height={10} />
                <button className="button-base ripple" onClick={onRegister} >Register{ spinner && <Spinner
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

export default Register