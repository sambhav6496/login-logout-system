const users =[]
const Joi = require('joi')
const validateUser = require("./validate")

class User {
    registration(userDetails){
        const {value ,error} = validateUser(userDetails)
        if (error) return {error: error.message}
        else {
            const user = users.find((u) => u.email === userDetails.email);
            if (user){
             return  { error: "user Exist" }
            }
            else {
                users.push(userDetails);
                console.log(users)
                return { data: users }
            }
        }

    }

    login(userDetails){
        const user = users.find((u) => u.email === userDetails.email);
        if(user){
            if(userDetails.password === user.password){
                return{
                    loggedIn : "logged in"
                }
            }else{
                return{
                    error : "email and password do not match"
                }
            }
        }else{
            return{
                error : "user does not exist"
            }
        }
      }
}


module.exports = User