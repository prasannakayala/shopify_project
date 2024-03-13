// import axios from "axios"
// import { CATEGORY_FETCHING_ERROR, CATEGORY_FETCHING_SUCCESS } from "../Constants/Constants"


// export const categoryFetching= (id)=>{
//     return async(dispatch)=>{
//         try{
//             const response= await axios.get("https://products-8dk6.onrender.com/products")
//             if (response.status===200){
//                 dispatch({type: CATEGORY_FETCHING_SUCCESS, payload: response.data.filter((ele)=> ele.category_id.$oid=== id)})
//             }else{
//                 dispatch({type: CATEGORY_FETCHING_ERROR, payload: response.message})
//             }
//         }
//         catch(err){
//             console.log("Error fetching...",err)
//         }
//     }
// }