import { REDUXCONSTANTS } from "../ReduxConstants"

export const LoginInfoAction = (payload) => {
    console.log('payload', payload)
    return {
        type: REDUXCONSTANTS.SET_LOGIN_INFO,
        payload
    }
}