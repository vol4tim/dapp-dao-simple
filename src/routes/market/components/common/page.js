import React, { PropTypes } from 'react'

const Page = function(props) {
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

        <div className="panel panel-default">
            <div className="panel-body">
                {props.menu}
            </div>
        </div>

        {props.children}
    </div>
}

Page.propTypes = {
    menu: PropTypes.element.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired
}

export default Page
