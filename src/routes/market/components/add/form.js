import React, { PropTypes, Component } from 'react'

export default class Form extends Component {
    render() {
        const {
            fields: { _sale/*, _quantity_sale, _buy, _quantity_buy*/ },
            fields,
            handleSubmit,
            error,
            submitting,
            labels,
            placeholders,
            marketApprove,
            getApprove,
            sale_input,
            quantity_approve,
            quantity_input
        } = this.props

        return (<div className="panel panel-default">
            <div className="panel-body">
                <form  className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">{labels[0]}</label>
                        <div className="col-sm-10">
                            <div className="input-group">
                                <input type="text" className="form-control" {..._sale} placeholder={placeholders[0]} onChange={(event)=>{
                                    _sale.onChange(event);
                                    getApprove(event.target.value)
                                }} />
                                <div className="input-group-addon">
                                    approve: <span className="label label-success">{quantity_approve}</span>
                                </div>
                            </div>
                        </div>
                        {_sale.touched && _sale.error ? _sale.error : ''}
                    </div>

                    {Object.keys(fields).map((name, index) => {
                        if (name == '_sale') {
                            return;
                        }
                        const field = fields[name]
                        return (
                            <div key={index} className="form-group">
                                <label className="col-sm-2 control-label">{labels[index]}</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" {...field} placeholder={placeholders[index]} />
                                </div>
                                {field.touched && field.error ? field.error : ''}
                            </div>
                        )
                    })}

                    <div className="form-group">
                        <div className="text-center">
                            {quantity_input > 0 ?
                                quantity_approve >= quantity_input ?
                                    <input
                                        type='submit'
                                        className="btn btn-default"
                                        disabled={submitting}
                                        value={submitting ? '...' : 'добавить'}
                                        />
                                    :
                                    <input
                                        type='button'
                                        className="btn btn-warning"
                                        value={'Дать доступ на '+ (quantity_input - quantity_approve)}
                                        onClick={()=>marketApprove(sale_input, (quantity_input - quantity_approve), quantity_input)}
                                        />
                                :
                                <input
                                    type='button'
                                    className="btn btn-default"
                                    disabled={true}
                                    value={'добавить'}
                                    />
                            }
                        </div>
                    </div>

                    {error && <div>{error}</div>}
                </form>
            </div>
        </div>
        )
    }
}

Form.propTypes = {
    labels: PropTypes.array.isRequired,
    placeholders: PropTypes.array.isRequired,
    marketApprove: PropTypes.func.isRequired,
    getApprove: PropTypes.func.isRequired,
    sale_input: PropTypes.string.isRequired,
    quantity_approve: PropTypes.number.isRequired,
    quantity_input: PropTypes.number.isRequired
}
