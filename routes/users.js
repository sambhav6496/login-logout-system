const users =[]
const Joi = require('joi')
const validateUser = require("./validate")

class User {
    registration(userDetails){
        const {value ,error} = validateUser(userDetails)
        if (error) return { message: "error",error: error.message}
        else {
            const user = users.find((u) => u.email === userDetails.email);
            if (user){
             return  { message: "user Exist" }
            }
            else {
                users.push(userDetails);
                return { message: "user added suceesfully" }
            }
        }

    }
}


module.exports = User