import { combineReducers } from 'redux'
import view from './view'
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    view,
    form: formReducer
})
