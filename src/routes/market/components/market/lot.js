import React, { PropTypes } from 'react'

const Lot = function(props) {
    return <div className="panel panel-default">
        <div className="panel-body">
            <div className="row">
                <div className="col-md-6">
                    <ul className="list-group" style={{marginBottom: 0}}>
                        <li className="list-group-item active">Продается</li>
                        <li className="list-group-item">{props.sale_name}</li>
                        <li className="list-group-item"><span className="label label-primary">{props.sale_address}</span></li>
                        <li className="list-group-item">{props.sale_quantity}</li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <ul className="list-group" style={{marginBottom: 0}}>
                        <li className="list-group-item active">За</li>
                        <li className="list-group-item">{props.buy_name}</li>
                        <li className="list-group-item"><span className="label label-primary">{props.buy_address}</span></li>
                        <li className="list-group-item">{props.buy_quantity}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="panel-footer">
            {!props.my ?
                props.approve_quantity < props.buy_quantity ?
                    <button className="btn btn-success" onClick={props.approveToken}>Дать доступ</button>
                    :
                    <button className="btn btn-success" onClick={props.dealLot}>Купить</button>
                :
                <button className="btn btn-warning" onClick={props.removeLot}>Снять лот</button>
            }
        </div>
    </div>
}

Lot.propTypes = {
    sale_name: PropTypes.string.isRequired,
    sale_address: PropTypes.string.isRequired,
    sale_quantity: PropTypes.number.isRequired,
    buy_name: PropTypes.string.isRequired,
    buy_address: PropTypes.string.isRequired,
    buy_quantity: PropTypes.number.isRequired,
    approve_quantity: PropTypes.number.isRequired,
    my: PropTypes.bool.isRequired,
    approveToken: PropTypes.func.isRequired,
    removeLot: PropTypes.func.isRequired,
    dealLot: PropTypes.func.isRequired
}

export default Lot
