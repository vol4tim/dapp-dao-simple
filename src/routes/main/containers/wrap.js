import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAddress } from '../../../modules/app/actions';
import { load, observeModules } from '../../../modules/modules/actions';

class WrapContainer extends Component {
    componentWillMount() {
        if (this.props.address != this.props.address_state) {
            this.load(this.props.address)
            this.props.observeModules()
        }
    }
    load(address) {
        this.props.load(address)
        this.props.setAddress(address)
    }
    render() {
        return (
            <div>
            {this.props.loaded ?
                this.props.children
                :
                <p>...</p>
            }
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        address_state: state.app.address,
        address: props.params.address,
        loaded: !_.isEmpty(state.modules)
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({load, setAddress, observeModules}, dispatch)
    return {
        load: actions.load,
        observeModules: actions.observeModules,
        setAddress: actions.setAddress
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrapContainer)
