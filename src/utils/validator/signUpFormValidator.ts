import { emailValidator, nameValidator, passwordValidator } from "./validator"

export const signUpFormValidator = (formData) =>{
    let err = {}
    if(!formData.name){
        err.name = "Name is required"
    }
    if(nameValidator(formData.name)){
        err.name = nameValidator(formData.name)
    }
    if(emailValidator(formData.email)){
        err.email = emailValidator(formData.email)
    }
    if(passwordValidator(formData.password)){
        err.password = passwordValidator(formData.password)
    }
    if(formData.confirmPassword !== formData.password ){
        err.confirmPassword = "Passwords don't match"
    }
    return err
}