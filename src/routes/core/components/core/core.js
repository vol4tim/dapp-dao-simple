import React, { PropTypes } from 'react'

const Core = function(props) {
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
    </div>
}

Core.propTypes = {
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired
}

export default Core
