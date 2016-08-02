import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '../components/header'
import Footer from '../components/footer'

import './style.css'

class App extends Component {
    render() {
        return <div>
            <Header title={this.props.title} />
            <div className="container">
                {this.props.children}
            </div>
            <Footer />
        </div>
    }
}

export default connect()(App)
