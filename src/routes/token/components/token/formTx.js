import React, { PropTypes, Component } from 'react'

export default class FormTx extends Component {
    render() {
        const {
            fields,
            handleSubmit,
            error,
            submitting,
            title,
            labels
        } = this.props

        return (<div className="panel panel-default">
            <div className="panel-heading">{title}</div>
            <div className="panel-body">
                <form  className="form-horizontal" onSubmit={handleSubmit}>
                    {Object.keys(fields).map((name, index) => {
                        const field = fields[name]
                        return (
                            <div key={index} className="form-group">
                                <label className="col-sm-2 control-label">{labels[index]}</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder={labels[index]} {...field} />
                                </div>
                                {field.touched && field.error ? field.error : ''}
                            </div>
                        )
                    })}

                    <div className="form-group">
                        <div className="text-center">
                            <input
                                type='submit'
                                className="btn btn-default"
                                disabled={submitting}
                                value={submitting ? '...' : 'Подтвердить'}
                                />
                        </div>
                    </div>
                    {error && <div>{error}</div>}
                </form>
            </div>
        </div>
        )
    }
}

FormTx.propTypes = {
    title: PropTypes.string.isRequired,
    labels: PropTypes.array.isRequired
}
