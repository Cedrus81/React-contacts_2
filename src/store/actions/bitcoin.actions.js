import { bitcoinService } from "../../services/bitcoin.service"

export function getCurrentRate() {
    return (dispatch) => {
        try {
            const rate = bitcoinService.getRate()
            dispatch({ type: 'GET_RATE', rate })
        } catch (e) {
            console.log(e)
        }
    }
}