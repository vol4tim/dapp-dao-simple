import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Token } from '../components/token';

class TokenContainer extends Component {
    render() {
        return (this.props.isModule) ?
            <Token {...this.props} />
            :
            <p>модуль не найден</p>
    }
}

function mapStateToProps(state, props) {
    const module = props.params.module
    const token = (_.has(state.modules, module)) ? state.modules[module] : false
    return {
        ...token,
        module: module,
        isModule: !_.isEmpty(token)
    }
}

export default connect(mapStateToProps)(TokenContainer)
