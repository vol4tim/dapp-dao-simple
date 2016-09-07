import React, { PropTypes, Component } from 'react'
import { Form } from '../components/start';

export default class StartContainer extends Component {
    render() {
        return <div>
            <Form onSubmit={(data)=>this.context.router.push('/app/'+ data.address)} />
        </div>
    }
}

StartContainer.contextTypes = {
    router: PropTypes.object.isRequired
}
