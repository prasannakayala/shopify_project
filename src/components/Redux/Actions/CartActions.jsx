import { REMOVE_FROM_CART, UPDATE_CART_LENGTH } from "../Constants/Constants";

export const addToCartActions = (id, item, dashboard) => {
  return (dispatch) => {
    // retrieve the cart form local storage
    let cart = localStorage.getItem("myCart");

    let arr = [];
    // console.log(arr, "actioncart")
    if (cart != null) {
      //  parse the cart data from JSON to an array
      arr = JSON.parse(cart);
      // check if an item with the given id already exists in the cart
      if (arr.find((ele) => ele.id === id) !== undefined) {
        let result = arr.findIndex((ele) => ele.id === id);
        // if the item exists, update its quantity
        arr[result] = {
          id: id,
          quantity: arr[result].quantity + 1,
          data: item
        };
      } else {
        // if the item doesn't exist, add it to the cart with a quantity
        arr.push({ id: id, quantity: 1, data: item, email: dashboard, cartLen: cart.length});
      }
    } else {
      arr.push({ id: id, quantity: 1, data: item, email: dashboard });
    }
    // Update the cart items
    localStorage.setItem("myCart", JSON.stringify(arr));

    // dispatch the action with the updated cart length
    const uniqueItemsCount = arr.reduce((count, item) => {
      return count + (item.quantity > 0 ? 1 : 0);
    }, 0);

    // console.log(uniqueItemsCount, "cartITEMSLENGTH");

    dispatch(updateCartLength(uniqueItemsCount));
  };
};


export const updateCartLength = (length) => {
  return {
    type: UPDATE_CART_LENGTH,
    payload: length,
  };
};

export const removeFromCart=( id)=> {
  console.log( id, "cartremove")
 
  return {
    type: REMOVE_FROM_CART,
  payload: {removalId: id}
  }
}


