import { combineReducers } from "redux";
import { LoginInfoReducer } from "./LoginInfoReducer";
import { SubMenuInfoReducer } from "./SubMenuInfoReducer";

export const rootReducer = combineReducers({

    LoginInfoReducer: LoginInfoReducer,
    SubMenuInfoReducer: SubMenuInfoReducer
})