import { emailValidator, passwordValidator } from "./validator"

export const signInFormValidator = (formData) =>{
    let err = {}
    if(emailValidator(formData.email)){
        err.email = emailValidator(formData.email)
    }
    // if(passwordValidator(formData.password)){
    //     err.password = passwordValidator(formData.password)
    // }

    if(!formData.password){
        err.password = "Password is required"
    }
    
    return err
}