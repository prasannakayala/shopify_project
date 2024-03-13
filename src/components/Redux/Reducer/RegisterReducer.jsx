import { REGISTER_ERROR, REGISTER_SUCCESS } from "../Constants/Constants"

const initialState= {
    register_data: [],
    register_error: "Getting Error while registering.."
}

// defining a reducer function to handle state changes based on dispatch actions
export const registerReducer= (state=initialState, action)=> {
    switch(action.type){
        case REGISTER_SUCCESS:
            // returning a new state object with updated register data
            return {...state,  register_data: action.payload}
        case REGISTER_ERROR :
            // returning a new state object with updated register_error
            return {...state, register_error: action.payload}
        default:
            return state
    }
}