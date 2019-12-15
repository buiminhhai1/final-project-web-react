import React, { useState } from "react";
import { FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";
import { message } from 'antd';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import "./signUp.css";
import { signUp } from '../../store/actions/auth';
import { getAuthError, getAuthPending, getAuthToken, getAuthRedirectPage } from "../../store/reducers/auth";

function SignUp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setComfirmPassword] = useState("");
    const [name, setName] = useState("");

    function validateForm() {
        return (
            email.length > 0 &&
            password.length > 0 &&
            password === confirmPassword &&
            name.length > 0
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();
        props.signUp(email, password, name);
    }

    if (props.token != null) {
        return <Redirect to={props.redirectPage} />
    }

    let errorMeassage = null;
    if (props.error) {
        errorMeassage = message.error(props.error);
    }

    return (
        <div className="Signup">
            <form onSubmit={handleSubmit}>
                {errorMeassage}
                <FormGroup controlId="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="name">
                    <FormLabel>Name</FormLabel>
                    <FormControl
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        onChange={e => setComfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                </FormGroup>
                <Button block
                    disabled={!validateForm() || props.pending}
                    type="submit"
                    variant="primary">
                    {props.pending ? "Loading" : "REGISTER"}
                </Button>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    error: getAuthError(state),
    pending: getAuthPending(state),
    token: getAuthToken(state),
    redirectPage: getAuthRedirectPage(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    signUp
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);