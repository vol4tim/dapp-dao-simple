import React, { PropTypes, Component } from 'react'

export default class View extends Component {
    render() {
        const { loader, address, name, modules } = this.props

        return <div>
            {loader ?
                <p>Загрузка...</p>
            :
                <div>
                    <span className="label label-danger pull-right">{address}</span>
                    <h1>DAO "{name}"</h1>
                    <ul className="list-group">
                        <li className="list-group-item active">Модули DAO:</li>
                        {modules.map(function(item) {
                            return <li className="list-group-item" key={item.address}>
                                {item.name}
                                <span className="label label-warning pull-right">{item.address}</span>
                            </li>
                        })}
                    </ul>
                </div>
            }
        </div>
    }
}

View.propTypes = {
    loader: PropTypes.bool.isRequired,
    address: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modules: PropTypes.array.isRequired
}
