import React, { PropTypes, Component } from 'react'

export default class StartForm extends Component {
    render() {
        const {
            fields: { address },
            handleSubmit,
            submitting
        } = this.props

        return <form onSubmit={handleSubmit((data)=>this.context.router.push('/app/'+ data.address))}>
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Адрес DAO" {...address} />
                <span className="input-group-btn">
                    <input
                        type='submit'
                        className="btn btn-default"
                        disabled={submitting}
                        value={submitting ? '...' : 'Открыть'}
                        />
                </span>
            </div>
            {address.touched && address.error ? <div className="alert alert-danger">{address.error}</div> : ''}
        </form>
    }
}

StartForm.contextTypes = {
    router: PropTypes.object.isRequired
}
