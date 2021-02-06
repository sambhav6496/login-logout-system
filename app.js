const express = require('express')
const app = express()
const Joi = require('joi')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
const path = require('path');

const users = []


app.use('/public', express.static(path.join(__dirname,'files')))
app.get("/register" , (req,res) => {
    res.sendFile(path.join(__dirname, 'files', 'index.html'))

})

app.post('/register', async (req,res,)=>{
  try {
    const emailValue = req.body.email
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const newUser ={
        id : Math.floor(Math.random()*10000000000),
        email : emailValue,
        password : hashPassword
    }
    const userValidation = validateUser(newUser)
    if(userValidation.error){
        console.log(userValidation.error)
    }else{
        const user = users.find((u)=>{
            if(u.email === req.body.email){
                return u
            }
        })
        if(user){
            res.redirect('/userexist')
        }else{
            users.push(newUser)
            res.redirect('/login')
        }
    }
    console.log(users)
  } catch (error) {
      console.log(error)
  }

})

app.get('/userexist', (req,res)=>{
    res.sendFile(path.join(__dirname, 'files', 'userExist.html'))
})


app.get("/login" , (req,res) => {
    res.sendFile(path.join(__dirname, 'files', 'login.html'))

})

app.post('/login', (req,res)=>{
    const user = users.find((u)=>{
        if(u.email === req.body.email){
            return u
        }
    })
    if(user){
        const hash = user.password
        const passwordEntered = req.body.password
        console.log([hash, passwordEntered])
        if(bcrypt.compareSync(passwordEntered, hash)){
            res.redirect('/loggedin')
        }else{
            res.redirect('/login')
        }
    }else{
        res.redirect('/register')
    }
})

app.get('/loggedin', (req,res)=>{
    res.sendFile(path.join(__dirname, 'files', 'loggedin.html'))
})



function validateUser(user) 
{ 
    const JoiSchema = Joi.object({
        id : Joi.number().required (),
        email: Joi.string().email().min(5).max(50).required(), 
        password : Joi.required()
    }).options({ abortEarly: false }); 
  
    return JoiSchema.validate(user) 
} 




app.listen(3000)