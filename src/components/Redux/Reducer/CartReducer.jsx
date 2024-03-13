import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_LENGTH } from "../Constants/Constants"

const initialState= {
    cart: JSON.parse(localStorage.getItem("myCart")) || undefined || 0,
    cartLength: 0
}

export const cartReducer = (state= initialState, action)=> {
    console.log(state.cart, "cartreducer")
    switch(action.type){
        case ADD_TO_CART:
            const {id, item, dashboard}= action.payload
            const existingItem = state.cart.find((ele)=> ele.id === id)

            if (existingItem){
                // existingItem.quantity +=1 
                state.cart.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                  )
            }else {
                state.cart.push({id: id, quantity: 1, data:item, email: dashboard})
            }
            const cartLengt= state.cart.reduce((total, item)=> total+ item.quantity,0)
            localStorage.setItem("myCart", JSON.stringify(state.cart))
            console.log("cart length after addtocart", cartLengt)
            return {...state, cart: [...state.cart], cartLengt}
            // update the cart length
        case UPDATE_CART_LENGTH:
            return {...state, cartLength: action.payload}
        case REMOVE_FROM_CART:
            const {removalId}= action.payload
            console.log(removalId, "cartred")
            const carts= JSON.parse(localStorage.getItem("myCart"))
            console.log(carts, "cartstatedata")
            if (carts.length >= 1){
                const updatedCartList= carts.filter((item)=> item.id !== removalId)
                console.log(updatedCartList, "updatedcartlist")
                console.log("Before removal from localStorage: ", localStorage.getItem("myCart"));
                localStorage.setItem("myCart", JSON.stringify(updatedCartList))
                console.log("After removal from localStorage: ", localStorage.getItem("myCart"));
                return {...state, cart: updatedCartList}
            }
                
        default:
            return state
    }

}
