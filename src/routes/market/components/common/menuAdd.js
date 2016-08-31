import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const MenuAdd = function(props) {
    return <div>
        <Link to={props.url_root +'/market'} className="btn btn-info">
            Назад
        </Link>
    </div>
}

MenuAdd.propTypes = {
    url_root: PropTypes.string.isRequired
}

export default MenuAdd
