const INITIAL_STATE = {
    rate: null
}

export function bitcoinReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_RATE':
            return {
                ...state,
                rate: action.rate
            }
        default:
            return state;
    }
}