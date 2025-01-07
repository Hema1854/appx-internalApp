import { REDUXCONSTANTS } from "../ReduxConstants"


const initialState = {
        userName: '',
        userEmail: ''
}

export const LoginInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUXCONSTANTS.SET_LOGIN_INFO:
            return {
                ...state,
                userName: action.payload.fullname,
                userEmail: action.payload.email
            }
        default:
            return state
    }
}