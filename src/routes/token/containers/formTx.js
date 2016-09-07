import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submitFormTx } from '../../../modules/modules/actions';
import FormTx from '../components/token/formTx';

/*const validate = values => {
    const errors = {};
    if (!values.from) {
        errors.from = 'required'
    }
    if (!values.to) {
        errors.to = 'required'
    }
    if (!values.value) {
        errors.value = 'required'
    }
    //errors._error = 'full error'
    return errors
};*/

function mapStateToProps(/*state*/) {
    return {
        //accounts: state.accounts.items
    }
}
function mapDispatchToProps(dispatch, props) {
    return {
        onSubmit: bindActionCreators((form)=>submitFormTx(form, props.module, props.func, props.message), dispatch)
    }
}
export default reduxForm({
    //validate
}, mapStateToProps, mapDispatchToProps)(FormTx)
