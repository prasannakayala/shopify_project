// email
const regexForEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexForPassword=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const regexForName=/^[a-zA-Z]+$/;
// const regexForMobile=/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const regexForMobile=/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/;


// gamil
export function isValidEmail(email){
    console.log(email,"email")
    if (!email){
        return "Email is required"
    }
    const handleEmail=regexForEmail.test(email);
    console.log(handleEmail, "email")
   if (handleEmail === false){
    return "This is invalid"
   } 
//    else{
//     return "This is valid"
//    }

}
// password
export function isValidPassword(password){
    console.log(password,"password")
    if (!password){
        return "Password is required"
    }
    const handlePassword= regexForPassword.test(password)
    console.log(handlePassword, "hadnlepassword")
    if (handlePassword === false){
        return "This is invalid"
    }
    
}
// firstName, lastName
export function isValidFirstName(firstName){
    // console.log(firstName,"firstname")
    if (firstName === "") {
        return "First name is required";
      }
    const handleFirstName= regexForName.test(firstName)
    console.log(handleFirstName, "handlefirstname")
    if (handleFirstName === false){
        return "This is invalid"
    }
   
}
export function isValidLastName(lastName){
    // console.log(firstName,"firstname")
    if (lastName ==="") {
        return "Last name is required";
      }
    const handleLastName= regexForName.test(lastName)
    console.log(handleLastName, "handlelastname")
    if (handleLastName === false){
        return "This is invalid"
    }
}

export function isValidMobileNumber(mobileNumber){
    // console.log(mobileNumber, "mobiel")
    if (!mobileNumber){
        return "Mobile number is required"
    }
    const handleMobileNumber = regexForMobile.test(mobileNumber)
    console.log(handleMobileNumber, "validationmobile")
    if (handleMobileNumber === false){
        return  "This is invalid"
    }
    // else{
    //     return "This is valid"
    // }
}


