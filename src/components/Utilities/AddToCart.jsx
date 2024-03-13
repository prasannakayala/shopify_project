export default function addToCart(id, item, dashboard){
    // retrieve the cart form local storage
    let cart= localStorage.getItem("myCart")
    console.log(dashboard, "email")

    // initialize an array to store cart items
    let arr=[]

    if (cart != null){
        //  parse the cart data from JSON to an array
        arr= JSON.parse(cart)  
        // check if an item with the given id already exists in the cart
        if (arr.find((ele)=> ele.id === id) !== undefined){
            let result= arr.findIndex((ele)=> ele.id === id)
            // if the item exists, update its quantity
            arr[result]= {id: id, quantity: arr[result].quantity + 1, data:item}
        }else{
            // if the item doesn't exist, add it to the cart with a quantity
            arr.push({id: id, quantity: 1, data: item, email: dashboard})
        }
    }
    else {
        // if the cart is empty, add the item with a quantity of 1
        arr.push({id: id, quantity:1, data: item, email: dashboard})    
    }

    // console.log("Arr", cart)
    // store the updated cart array in localstorage
    localStorage.setItem("myCart", JSON.stringify(arr))
}

