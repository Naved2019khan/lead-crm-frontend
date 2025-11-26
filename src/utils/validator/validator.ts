export const emailValidator = (email : string) =>{
    let err 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!emailRegex.test(email)){
        err = "Invalid email format"
    }
    return err
}
export const passwordValidator = (password : string) =>{
   let err
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/
   if(!passwordRegex.test(password)){
       err = "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters"
   }
   return err
}

export const numberValidator = (number : string) =>{
    let err 
    const numberRegex = /^[0-9]+$/
    if(!numberRegex.test(number)){
        err = "Invalid number format"
    }
    return err
}

export const nameValidator = (name : string) =>{
    let err 
    const nameRegex = /^[a-zA-Z\s]+$/
    if(!nameRegex.test(name)){
        err = "Invalid name format"
    }
    return err
}

