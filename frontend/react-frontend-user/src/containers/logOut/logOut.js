import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../../store/actions/auth';
import { getAuthToken } from "../../store/reducers/auth";

class logOut extends Component {
    async componentWillMount() {
        await this.props.onLogout();
        console.log(this.props.token);

    };

    render() {
        return (
            <Redirect to="/" />
        )
    }
}

const mapStateToProps = state => ({
    token: getAuthToken(state),
})

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(logOut);