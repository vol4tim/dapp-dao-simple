import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Module = function(props) {
    const { name, address, url } = props

    return <Link to={url} className="list-group-item">
        {name} <span className="label label-primary pull-right">{address}</span>
    </Link>
}

Module.propTypes = {
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default Module
