import { LOAD, REQUEST } from '../constants/View'

const initialState = {
    loader: false,
    name: '',
    modules: []
}

export default function main(state = initialState, action) {
    switch (action.type) {
        case REQUEST:
            return {...state, loader: true}

        case LOAD:
            return {...state, ...action.payload, loader: false}

        default:
			return state;
    }
}
