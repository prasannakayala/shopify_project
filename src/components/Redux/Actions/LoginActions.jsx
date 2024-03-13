import axios from "axios"
import { LOGIN_ERROR, LOGIN_SUCCESS } from "../Constants/Constants"


export const loginUsers= ()=> async (dispatch)=> {
    try{
        const response=await axios.get("http://localhost:3005/registerData")
        console.log(response, "loginactions")
        
        // const usersList= response.data
        if (response){
            if (response.status === 200){
                dispatch({type: LOGIN_SUCCESS, payload: response.data})
            }
        }
         
        // }else{
        //     dispatch({type: LOGIN_ERROR, payload: response.message})
        // }
        
    }
    catch(err){
        console.log("Error fetching..", err)
    }
}