import '../style/reset.css'
import './index.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import Header from 'containers/Header'
import Left from 'containers/Left'
import Footer from 'containers/Footer'

export default class App extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <div>
        <Header />
        <div className="box">
          <Left />
          {renderRoutes(this.props.route.routes)}
        </div>
        <Footer />
      </div>
    )
  }
}