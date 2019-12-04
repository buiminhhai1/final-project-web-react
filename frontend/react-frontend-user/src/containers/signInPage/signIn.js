import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import "./Login.css";
import { loginAction, loginGoogleAction, loginFacebookAction } from '../asynchronous.action';
import { getLoginPending, getLoginError } from "../../reducers/auth.reducer";

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
        props.postLogin({ email, password, method: 'local' });
    }

    const responseFacebook = async (response) => {
        // await console.log(response.accessToken);
        await props.facebookLogin({ access_token: response.accessToken })
    }

    const responseGoogle = async (response) => {
        await console.log(response);
        const googleUser = {
            method: 'google',
            email: response.profileObj.email,
            id: response.profileObj.googleId,
            name: response.profileObj.name,
            imageUrl: response.profileObj.imageUrl,
        }
        await props.googleLogin(googleUser)
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
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    error: getLoginError(state),
    pending: getLoginPending(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    postLogin: loginAction,
    googleLogin: loginGoogleAction,
    facebookLogin: loginFacebookAction
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);