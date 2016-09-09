import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { getWeb3, isAccounts } from '../../utils/web3'

import Header from '../components/app/header'
import Footer from '../components/app/footer'
import Notification from '../components/app/notification'
import Tokens from '../components/app/tokens'
import { flashMessage } from '../../modules/app/actions';

import './style.css'

class App extends Component {
    render() {
        return <div>
            <Header title={this.props.title} address={this.props.address} />
            <div className="container">
                {!_.isEmpty(this.props.tokens) &&
                    <Tokens items={this.props.tokens} />
                }
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
    var tokens = []
    if (_.has(state.modules, 'shares')) {
        tokens.push({
            name: state.modules.shares.name,
            balance: state.modules.shares.balance,
            address: state.modules.shares.address
        })
    }
    if (_.has(state.modules, 'credits')) {
        tokens.push({
            name: state.modules.credits.name,
            balance: state.modules.credits.balance,
            address: state.modules.credits.address
        })
    }
    return {
        title: state.app.title,
        address: state.app.address,
        flash_message: state.app.flash_message,
        tokens: tokens
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({flashMessage}, dispatch)
    return {
        flashMessage: actions.flashMessage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
