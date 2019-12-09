import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../../store/actions/auth';

class logOut extends Component {
    componentWillMount() {
        this.props.onLogout();
    };

    render() {
        return (
            <Redirect to="/" />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout)
    }
}

export default connect(
    mapDispatchToProps
)(logOut);