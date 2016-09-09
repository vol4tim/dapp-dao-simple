import { reduxForm } from 'redux-form'
import { Form } from '../components/start';
export const fields = [ 'address' ]

const validate = values => {
    const errors = {};
    if (!values.address) {
        errors.address = 'required'
    }
    return errors
};

export default reduxForm({
    form: 'StartForm',
    fields,
    validate
})(Form)
