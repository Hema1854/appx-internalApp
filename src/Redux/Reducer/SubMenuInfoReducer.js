import { REDUXCONSTANTS } from "../ReduxConstants";

const initialState = {
    subMenu: ''
}

export const SubMenuInfoReducer = (state = initialState, action) => {
    console.log('action', action);
switch (action.type) {
    case REDUXCONSTANTS.SET_SUBMENU_INFO:
        return {
            ...state,
            subMenu: action.payload,
        }
    default:
        return state
}
}