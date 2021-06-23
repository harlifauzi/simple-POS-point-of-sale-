import React, { useEffect } from 'react';
import { Login, Register, Home, Products, Cashier, Report } from "./pages";
import {
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import { Firebase } from './configs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';


const App = () => {
    let history = useHistory();
    const stateGlobal = useSelector(state => state);
    const dispatch = useDispatch();

    const checkLogin = () => {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                Firebase.database().ref(`employees/${user.uid}`).once('value')
                    .then(res => {
                        console.log(res.val())
                        dispatch({type: 'UPDATE_DATA_EMPLOYEE', payload: res.val()});
                        console.log(stateGlobal);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                history.replace("/login")
            }
        });
    }

    useEffect(() => {
        checkLogin();
        console.log(stateGlobal);
    }, [])

    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/products">
                <Products />
            </Route>
            <Route path="/cashier">
                <Cashier />
            </Route>
            <Route path="/report">
                <Report />
            </Route>
        </Switch>
    )
}

export default App
