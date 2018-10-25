import React, { Component } from 'react'
import { connect } from 'react-redux';
import routes from 'routes';
import renderRoutes from 'utils/renderRoutes';

class ConfirmLogin extends Component{
    render(){
        return(
            <React.Fragment>
                {renderRoutes(routes) }
            </React.Fragment>
        )
    }
}

export default ConfirmLogin;