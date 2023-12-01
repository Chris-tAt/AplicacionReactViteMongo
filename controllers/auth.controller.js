import User from '../model/user.model.js'
import bcrypt from "bcryptjs"
import { createAccesToken } from "../libs/jwt.js";

// con esta funcion estamos creando un usuario, estamos hasheando el password y estamos colocando un jwt

export const register = async (req,res) => {
    const {email, password, username} = req.body
   
    try {
       const passwordHash = await bcrypt.hash(password, 10)


        const newUser = new User ({
            email, 
            username,
            password: passwordHash 
        })


       const userSave = await newUser.save()

       const token = await createAccesToken({id: userSave._id})

        res.cookie('token', token)


        res.json({
            id: userSave._id,
            username: userSave.username,
            email: userSave.email,
            createdAt: userSave.createdAt,
            updatedAt: userSave.updatedAt
        })
    } catch (error) {
       res.status(500).json({message: error.message})
    }
}



export const login = async (req,res) => {
    const {email, password} = req.body
   
    try {
        // comparamos la contraseña con la del usuario de la bd
      const userFound = await User.findOne({email})

      if(!userFound) return res.status(400).json({message: "User not found"})


       const isMatch = await bcrypt.compare(password, userFound.password)

       if(!isMatch) return res.status(400).json({message: "incorrect password"})

       const token = await createAccesToken({id: userFound._id})

        res.cookie('token', token)


        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
       res.status(500).json({message: error.message})
    }
}

export const logout = (req,res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)

}

export const profile = async (req,res) => {
 const userFound = await User.findById(req.decoded.id)
 if(!userFound) return res.status(400).json({message: "User Not found"})

 return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
 })
   res.send('profile')
}

