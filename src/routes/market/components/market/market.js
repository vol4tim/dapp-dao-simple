import React, { PropTypes } from 'react'
import Lot from './lot'

const Market = function(props) {
    return <div>
        {props.lots.map(function(item, index) {
            return <Lot key={index} {...item}
                approveToken={()=>props.approveToken(item.buy_address, item.buy_quantity)}
                dealLot={()=>props.dealLot(item.address)}
                removeLot={()=>props.removeLot(item.address)} />;
        })}
    </div>
}

Market.propTypes = {
    lots: PropTypes.array.isRequired,
    removeLot: PropTypes.func.isRequired,
    dealLot: PropTypes.func.isRequired,
    approveToken: PropTypes.func.isRequired
}

export default Market
