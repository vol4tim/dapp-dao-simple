import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Page } from '../components/common';
import { MenuMarket } from '../components/common';
import { Market } from '../components/market';
import { marketDealLot, marketRemoveLot, marketApproveToken } from '../../../modules/modules/actions';

class MarketContainer extends Component {
    render() {
        return (this.props.isModule) ?
            <Page {...this.props} menu={<MenuMarket url_root={this.props.url_root} />}>
                <Market {...this.props} />
            </Page>
            :
            <p>модуль не найден</p>
    }
}

function mapStateToProps(state, props) {
    const market = (_.has(state.modules, 'market')) ? state.modules.market : false
    const url_root = 'app/'+ props.params.address
    return {
        ...market,
        url_root,
        isModule: !_.isEmpty(market)
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({marketDealLot, marketRemoveLot, marketApproveToken}, dispatch)
    return {
        removeLot: actions.marketRemoveLot,
        dealLot: actions.marketDealLot,
        approveToken: actions.marketApproveToken
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MarketContainer)
