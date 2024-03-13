import axios from 'axios';
import {REGISTER_SUCCESS} from '../Constants/Constants'
import {REGISTER_ERROR} from '../Constants/Constants'

// defining action creator function for registering user data
export const registerData= (postData) =>{
    // return async dispatch funciton
   return async (dispatch)=>{
    try{
        const response=await axios.post("http://localhost:3005/registerData", postData);
        console.log(response.data, "registeractions")
        // dispatching a success action with the receved data
        if (response.status=== 200){
            dispatch({type: REGISTER_SUCCESS, payload: response.data})
        }else{
            // dispatching a error action with the error message
            dispatch({type: REGISTER_ERROR, payload: response.message})
        }
    }
    catch(err){
        console.log("Error fetching", err) 
     }
}
}