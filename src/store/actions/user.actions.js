import { userService } from "../../services/user.service"

export function spendBalance(amount) {
    return async (dispatch) => {
        dispatch({ type: 'SPEND_COINS', amount })
    }
}

export function getLoggedInUser() => {
    return (dispatch) => {
        try {
            const user = userService.getLoggedInUser()
            dispatch({ type: 'GET_USER', user })
        } catch (err) {
            console.log(err)
        }
    }
}