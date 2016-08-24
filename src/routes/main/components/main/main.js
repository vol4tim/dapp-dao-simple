import React, { PropTypes } from 'react'
import Module from './module'

const Main = function(props) {
    return <div>
        <h1>{props.name}</h1>
        <p>Founder <span className="label label-primary">{props.founder}</span></p>
        <p>Owner <span className="label label-primary">{props.owner}</span></p>
        <p>{props.desc}</p>
        <div className="list-group">
            <span href="#" className="list-group-item active">Modules</span>
            {props.modules.map(function(item, index) {
                return <Module key={index} {...item} />;
            })}
        </div>
    </div>
}

Main.propTypes = {
    name: PropTypes.string.isRequired,
    founder: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    modules: PropTypes.array.isRequired
}

export default Main
