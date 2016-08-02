import React, { PropTypes, Component } from 'react'
import Form from './form'

export default class Main extends Component {
    render() {
        return <div>
            <Form onSubmit={(data)=>this.context.router.push('/view/'+ data.address)} />
        </div>
    }
}

Main.contextTypes = {
    router: PropTypes.object.isRequired
}
