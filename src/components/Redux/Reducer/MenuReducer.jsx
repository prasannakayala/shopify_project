import { CATEGORY_FETCHING_SUCCESS, COLOR_FETCHING_SUCCESS, FETCHING_PRODUCTS_ERROR, FETCHING_PRODUCTS_SUCCESS } from "../Constants/Constants"

const initialState= {
    products_list: [],
    loading: true,
    products_error: "Error while fetching products..."
}


export const productReducer= (state= initialState, action)=> {
    switch(action.type){
        // update the state with the fetched products and set loading to false
        case FETCHING_PRODUCTS_SUCCESS:
            return {...state, products_list: action.payload, loading: false}
        case CATEGORY_FETCHING_SUCCESS:
            return {...state, products_list: action.payload, loading: false}
        case COLOR_FETCHING_SUCCESS:
            return {...state, products_list: action.payload, loading: false}
        // update the state with the error message and set loading to false
            case FETCHING_PRODUCTS_ERROR:
            return {...state, products_error: action.payload, loading: false}
        default:
            return state 
    }
}

