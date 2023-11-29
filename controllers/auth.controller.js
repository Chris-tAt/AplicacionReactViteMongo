import User from '../model/user.model.js'

export const register = async (req,res) => {
    const {email, password, username} = req.body
   
    try {
        const newUser = new User ({
            email, 
            password, 
            username
        })
       const userSave = await newUser.save()
        res.json(userSave)
    } catch (error) {
        console.log(error)
    }
}



export const login = (req,res) => {
    res.send('logeado')
}