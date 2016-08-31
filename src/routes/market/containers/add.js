import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submitMarketAdd } from '../../../modules/modules/actions';
import { getMarketApproveToken, marketApproveToken } from '../../../modules/tokens/actions';
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

    var sale_input = ''
    var quantity_approve = 0
    var quantity_input = 0
    if (_.has(state.form, 'MarketAdd')) {
        if (_.has(state.form.MarketAdd, '_sale') && _.has(state.form.MarketAdd._sale, 'value')) {
            sale_input = state.form.MarketAdd._sale.value
            var token = _.find(state.tokens.items, {token: sale_input})
            if (!_.isEmpty(token)) {
                quantity_approve = token.value
            }
        }
        if (_.has(state.form.MarketAdd, '_quantity_sale') && _.has(state.form.MarketAdd._quantity_sale, 'value')) {
            quantity_input = _.toNumber(state.form.MarketAdd._quantity_sale.value)
        }
    }
    return {
        ...market,
        url_root,
        labels: ['sale', 'quantity sale', 'buy', 'quantity buy'],
        placeholders: ['0x111', '1', '0x111', '1'],
        quantity_approve,
        sale_input,
        quantity_input
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSubmit: bindActionCreators((form)=>submitMarketAdd(form), dispatch),
        marketApprove: bindActionCreators(marketApproveToken, dispatch),
        getApprove: bindActionCreators(getMarketApproveToken, dispatch)
    }
}
export default reduxForm({
    form: 'MarketAdd',
    fields
}, mapStateToProps, mapDispatchToProps)(AddContainer)
