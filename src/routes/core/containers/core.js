import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Core } from '../components/core';

class CoreContainer extends Component {
    render() {
        return <Core {...this.props} />
    }
}

function mapStateToProps(state) {
    const core = state.modules.core
    return {
        ...core
    }
}

export default connect(mapStateToProps)(CoreContainer)
