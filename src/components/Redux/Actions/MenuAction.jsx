import axios from "axios"
import { FETCHING_PRODUCTS_ERROR, FETCHING_PRODUCTS_SUCCESS, CATEGORY_FETCHING_SUCCESS, COLOR_FETCHING_SUCCESS } from "../Constants/Constants"

export const categoryFetching = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("https://products-8dk6.onrender.com/products");
            if (response.status === 200) {
                // if successful, dispatch a success action with the fetched data
                dispatch({ type: FETCHING_PRODUCTS_SUCCESS, payload: response.data });

                // Filtering based on category ID
                if (id) {
                    dispatch({
                        type: CATEGORY_FETCHING_SUCCESS,
                        payload: response.data.filter((ele) => ele.category_id.$oid === id)
                    });
                }

            } else {
                // if the response status is not 200, dispatch an error action with the error message
                dispatch({ type: FETCHING_PRODUCTS_ERROR, payload: response.message });
            }
        } catch (err) {
            console.log("Error fetching...", err);
        }
    };
};

export const colorFetching = (colorId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("https://products-8dk6.onrender.com/products");
            console.log(response.data.filter((ele) => ele.color_id.$oid === colorId), "menuaction");
            console.log(colorId, "menucolorid")
            if (response.status === 200) {
                // if successful, dispatch a success action with the fetched data
                dispatch({ type: FETCHING_PRODUCTS_SUCCESS, payload: response.data });
            

                // Filtering based on color ID
                if (colorId) {
                    dispatch({
                        type: COLOR_FETCHING_SUCCESS,
                        payload: response.data.filter((ele) => ele.color_id.$oid === colorId)
                    });
                }
            } else {
                // if the response status is not 200, dispatch an error action with the error message
                dispatch({ type: FETCHING_PRODUCTS_ERROR, payload: response.message });
            }
        } catch (err) {
            console.log("Error fetching...", err);
        }
    };
};
