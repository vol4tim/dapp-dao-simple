import React, { PropTypes, Component } from 'react'
import { reduxForm } from 'redux-form'

export const fields = [ 'address' ]

const validate = values => {
    const errors = {};
    if (!values.address) {
        errors.address = 'required'
    }
    return errors
};

export default class StartForm extends Component {
    render() {
        const {
            fields: { address },
            handleSubmit,
            submitting
        } = this.props

        return <form onSubmit={handleSubmit}>
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

StartForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    submitting: PropTypes.bool.isRequired
}

export default reduxForm({
    form: 'StartForm',
    fields,
    validate
})(StartForm)
