import { FLASH_MESSAGE, SET_ADDRESS } from './actionTypes'

export function setAddress(address) {
    return {
        type: SET_ADDRESS,
        payload: address
    }
}

export function flashMessage(message) {
    return {
        type: FLASH_MESSAGE,
        payload: message
    }
}
