import { LOAD, UPDATE_MODULE } from './actionTypes'

const initialState = {
    // core: {
    //     url: '/core',
    //     name: 'NAME DAO',
    //     address: '0x33333333333333333333333333',
    //     founder: '0x111111111111111111111111111',
    //     owner: '0x222222222222222222222222222',
    //     desc: 'With Bootstrap 2, we added optional mobile friendly styles for key aspects of the framework. With Bootstrap 3, weve rewritten the project to be mobile friendly from the start. Instead of adding on optional mobile styles, theyre baked right into the core. In fact, Bootstrap is mobile first. Mobile first styles can be found throughout the entire library instead of in separate files.'
    // },
    // credits: {
    //     url: '/token',
    //     name: 'DAO credits',
    //     address: '0x44444444444444444444444444444444',
    //     owner: '0x5555555555555555555555555555555555',
    //     decimals: '100',
    //     symbol: 'FT',
    //     total_supply: '100FT',
    //     balance: '12FT'
    // }
}

export default function modules(state = initialState, action) {
    switch (action.type) {
		case LOAD:
			return action.payload

		case UPDATE_MODULE:
            var new_module = {...state[action.payload.module], ...action.payload.data}
            return {...state, [action.payload.module]: new_module}

        default:
          return state;
    }
}
