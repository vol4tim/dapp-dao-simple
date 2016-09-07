import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const MenuMarket = function(props) {
    return <div>
        <Link to={props.url_root +'/market/add'} className="btn btn-info">
            Добавить лот
        </Link>
    </div>
}

MenuMarket.propTypes = {
    url_root: PropTypes.string.isRequired
}

export default MenuMarket
