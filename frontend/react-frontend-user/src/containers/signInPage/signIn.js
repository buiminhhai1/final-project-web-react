import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import { getSignInError, getSignInPending } from "../../store/reducers/auth";
import { signIn, signInFacebook, signInGoogle } from '../../store/actions/auth';

import "./signIn.css";

//reads in configuration from a .env file
require('dotenv').config();
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const facebookClientId = process.env.REACT_APP_FACEBOOK_CLIENT_ID;

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isPending = props.pending;

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.signIn(email, password);
    }

    const responseFacebook = async (response) => {
        await console.log(response);
        await props.signInFacebook(response.accessToken);
    }

    const responseGoogle = async (response) => {
        await console.log(response);
        await props.signInGoogle(response.accessToken);
        // const googleUser = {
        //     method: 'google',
        //     email: response.profileObj.email,
        //     id: response.profileObj.googleId,
        //     name: response.profileObj.name,
        //     imageUrl: response.profileObj.imageUrl,
        // }
        // await props.signInGoogle(googleUser)
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                {props.error && <Alert variant='danger'>
                    The account is not correct!!!
                </Alert>}
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        autoComplete="true"
                    />
                </FormGroup>
                <Button block bsSize="large"
                    disabled={!validateForm() || isPending}
                    type="submit"
                    variant="warning">
                    {isPending ? 'Loading…' : 'LOGIN'}
                </Button>
                <GoogleLogin
                    clientId={googleClientId}
                    render={renderProps => (
                        <button className="btn btn-danger btn-block my-2"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}>
                            <i class="fab fa-google mr-2"></i>
                            Login with Google
                        </button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
                <FacebookLogin
                    appId={facebookClientId}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    icon={<i class="fab fa-facebook-f mr-2"></i>}
                    cssClass="btn btn-primary btn-block my-2"
                />
                <NavLink
                    className="signUpLink"
                    to='/signUp'
                    exact>
                    Don't have account? Sign up now
                </NavLink>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    error: getSignInError(state),
    pending: getSignInPending(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    signIn, signInGoogle, signInFacebook
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);