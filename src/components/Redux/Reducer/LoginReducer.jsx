import { LOGIN_ERROR, LOGIN_SUCCESS } from "../Constants/Constants"

const initialState= {
    login_data: [],
    login_error: "Error fetching while login..."
}

export const loginReducer= (state= initialState, action)=>{
    // console.log(action.payload, "loginreducer")

    switch(action.type){
        case LOGIN_SUCCESS:
            return {...state, login_data: action.payload}
        case LOGIN_ERROR:
            return {...state, login_error: action.payload}
        default:
            return state
    }
}

