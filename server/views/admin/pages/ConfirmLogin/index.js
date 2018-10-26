import React, { Component } from 'react'
import { connect } from 'react-redux';
import routes from 'routes';
import renderRoutes from 'utils/renderRoutes';
import { authPath } from 'utils/config';

class ConfirmLogin extends Component{
    render(){
        const authed = window.sessionStorage.getItem("isLogin") == "true";
        return(
            <React.Fragment>
                {renderRoutes(routes, authed, authPath) }
            </React.Fragment>
        )
    }
}

export default ConfirmLogin;