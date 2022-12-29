import { userService } from "../../services/user.service"
const INITIAL_STATE = {
    loggedInUser: null
}

export function userReducer(state = INITIAL_STATE, action) {
    const { loggedInUser } = state

    switch (action.type) {
        case 'SPEND_COINS':
            return {
                ...state,
                loggedInUser: { ...loggedInUser, coins: loggedInUser.coins - action.amount }
            }
        case 'GET_USER':
            return {
                ...state,
                loggedInUser: action.user
            }
        default:
            return state;
    }

}