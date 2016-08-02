import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import View from '../../components/view';
import * as ViewActions from '../../actions/ViewActions'

class ViewConteiner extends Component {
    componentDidMount() {
        this.props.load(this.props.address);
    }

    render() {
        return (<View {...this.props} />)
    }
}

function mapStateToProps(state, props) {
    return {
        ...state.view,
        address: props.params.address
    }
}

function mapDispatchToProps(dispatch) {
    const viewActions = bindActionCreators(ViewActions, dispatch);
    return {
        load: viewActions.load
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewConteiner)
