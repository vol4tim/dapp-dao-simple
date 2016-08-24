import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getWeb3, isAccounts } from '../../utils/web3'

import Header from '../components/app/header'
import Footer from '../components/app/footer'
import Notification from '../components/app/notification'
import { flashMessage } from '../../modules/app/actions';

import './style.css'

class App extends Component {
    render() {
        return <div>
            <Header title={this.props.title} address={this.props.address} />
            <div className="container">
                {getWeb3() ?
                    isAccounts() ?
                        this.props.children
                        :
                        <p>нет аккаунтов</p>
                    :
                    <p>нужен mist</p>
                }
            </div>
            <Footer />
            <Notification message={this.props.flash_message} onClose={()=>this.props.flashMessage('')} />
        </div>
    }
}

function mapStateToProps(state) {
    return {
        title: state.app.title,
        address: state.app.address,
        flash_message: state.app.flash_message
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({flashMessage}, dispatch)
    return {
        flashMessage: actions.flashMessage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
