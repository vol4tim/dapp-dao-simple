import { ADD_TOKEN, UPDATE_TOKEN } from './actionTypes'

const initialState = {
    items: []
}

export default function tokens(state = initialState, action) {
    switch (action.type) {
		case ADD_TOKEN:
			return {...state, items: [...state.items, action.payload]}

		case UPDATE_TOKEN:
            var items = state.items.map((item) => {
                if (item.token === action.payload.token) {
                    return {...item, value: action.payload.value}
                }
                return item
            })
            return {...state, items: items}

        default:
          return state;
    }
}
