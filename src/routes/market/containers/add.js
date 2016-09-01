import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submitMarketAdd } from '../../../modules/modules/actions';
import { Page } from '../components/common';
import { MenuAdd } from '../components/common';
import { Form } from '../components/add';
import _ from 'lodash';
export const fields = [ '_sale', '_quantity_sale', '_buy', '_quantity_buy' ]

class AddContainer extends Component {
    render() {
        return <Page {...this.props} menu={<MenuAdd url_root={this.props.url_root} />}>
            <Form {...this.props} />
        </Page>
    }
}

function mapStateToProps(state, props) {
    const market = (_.has(state.modules, 'market')) ? state.modules.market : false
    const url_root = 'app/'+ props.params.address
    return {
        ...market,
        url_root,
        labels: ['sale', 'quantity sale', 'buy', 'quantity buy'],
        placeholders: ['0x111', '1', '0x111', '1']
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSubmit: bindActionCreators((form)=>submitMarketAdd(form), dispatch)
    }
}
export default reduxForm({
    form: 'MarketAdd',
    fields
}, mapStateToProps, mapDispatchToProps)(AddContainer)
