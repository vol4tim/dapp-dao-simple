import React, { PropTypes, Component } from 'react'

export default class Tokens extends Component {
    render() {
        return <div className="panel panel-default">
            <div className="panel-body">
                <ul className="nav nav-pills">
                    {this.props.items.map(function(item, index) {
                        return <li key={index} className="disabled" style={{paddingRight: 10}}>
                            {item.name} <span className="label label-info">{item.balance}</span>
                            <br />
                            <small>{item.address}</small>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    }
}

Tokens.propTypes = {
    items: PropTypes.array.isRequired
}
