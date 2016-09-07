import { FLASH_MESSAGE, SET_ADDRESS } from './actionTypes'

const initialState = {
    title: 'Dapp dao simple',
    flash_message: '',
    address: ''
}

export default function app(state = initialState, action) {
    switch (action.type) {
        case SET_ADDRESS:
            return { ...state, address: action.payload}

        case FLASH_MESSAGE:
            return { ...state, flash_message: action.payload}

        default:
			return state;
    }
}
