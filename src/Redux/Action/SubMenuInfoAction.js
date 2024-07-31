import { REDUXCONSTANTS } from "../ReduxConstants";


export const SubMenuInfoAction = (payload) => {
    console.log('payload1', payload)
    return {
        type: REDUXCONSTANTS.SET_SUBMENU_INFO,
        payload
    }
}  