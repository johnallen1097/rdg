import { AuthActionTypes } from "./auth-types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isAdmin:false,
    data:null,
    loading:true
}

export default function(state = initialState, action){
    const { type, payload } = action;
    switch (type) {
        case AuthActionTypes.USER_LOADED:
            return{
                ...state,
                ...payload,
                loading:false
            }

        case AuthActionTypes.LOGIN_SUCCESS:
        case AuthActionTypes.REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                loading:false
            }

        case AuthActionTypes.REGISTER_FAIL:
        case AuthActionTypes.AUTH_ERROR:
        case AuthActionTypes.LOGIN_FAIL:
        case AuthActionTypes.LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                data:null,
                isAdmin:null,
                loading:false
            }
    
        default:
            return state
    }
}