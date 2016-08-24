import React, { PropTypes } from 'react'
import FormTx from '../../containers/formTx'

const Token = function(props) {
    return <div>
        <div className="row">
            <div className="col-md-8">
                <h1>{props.name}</h1>
            </div>
            <div className="col-md-4 text-right" style={{paddingTop: 32}}>
                <span className="label label-primary">{props.address}</span>
            </div>
        </div>
        <p>Owner <span className="label label-primary">{props.owner}</span></p>
        <p>Decimals <span className="label label-primary">{props.decimals}</span></p>
        <p>Symbol <span className="label label-primary">{props.symbol}</span></p>
        <p>Total Supply <span className="label label-primary">{props.total_supply}</span></p>
        <p>Balance <span className="label label-primary">{props.balance}</span></p>
        <hr />
        <FormTx form='transfer' message="Отправленна сумма %_value% для %_to%" func='transfer' module={props.module} title='Transfer' fields={[ '_to', '_value' ]} labels={[ 'destination address', 'amount' ]} />
        <FormTx form='transferFrom' message="Отправленна сумма %_value% от %_from% для %_to%" func='transferFrom' module={props.module} title='Transfer from' fields={[ '_from', '_to', '_value' ]} labels={[ 'source address', 'destination address', 'amount' ]} />
        <FormTx form='approve' message="Дан доступ на сумма %_value% для %_address%" func='approve' module={props.module} title='Approve' fields={[ '_address', '_value' ]} labels={[ 'target address', 'amount' ]} />
        <FormTx form='unapprove' message="Доступ отменен для %_address%" func='unapprove' module={props.module} title='Unapprove' fields={[ '_address' ]} labels={[ 'target address' ]} />
        <FormTx form='emission' message="Выполнена эмиссия на сумму %_value%" func='emission' module={props.module} title='Emission' fields={[ '_value' ]} labels={[ 'amount' ]} />
        <FormTx form='burn' message="Выполнено сжигание на сумму %_value%" func='burn' module={props.module} title='Burn' fields={[ '_value' ]} labels={[ 'amount' ]} />
        <FormTx form='delegate' message="Права переданны для %_owner%" func='delegate' module={props.module} title='Delegate' fields={[ '_owner' ]} labels={[ 'new address' ]} />
    </div>
}

Token.propTypes = {
    module: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    decimals: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    total_supply: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
}

export default Token
