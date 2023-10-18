import userModel from "../../db/user.model.js";
import express from 'express'; //added
import bcrypt from 'bcrypt';
import Joi from "joi";
import jwt from "jsonwebtoken";
// import bodyParser from 'body-parser'; //added
const app = express(); //added
// app.use(bodyParser.json())
// import sendEmail from "../../utilites/sendMail.js";
import { sendToEmail } from "../../utilites/sendMail.js";//lastAdded
import session from "express-session";//lastAdded

// ===================================get all user=============================================
const getAllUsers = async (req, res) => {
    let getAllUsers = await userModel.find()
    res.json({message: "Hi", getAllUsers})
}

//===========================================signUp==============================================
const signUp = async (req, res) => {
    try {
        // let {error} = signUpValidationSchema.validate(req.body, {abortEarly: false})
        // if(error) {
        //     res.status(400).json({message: "validation error", error})
        // }else {
            let {email} = req.body;
            let foundedUser = await userModel.findOne({email: email});
            if(foundedUser) {
                res.status(409).json({message: "already register"})
            } else {

                let hashPassword = bcrypt.hashSync(req.body.password, 7)
                let addedUser = await userModel.insertMany({...req.body, password: hashPassword});
                // sendEmail()
                sendToEmail(req.body.email)
                res.status(201).json({message: "added successfully", addedUser})
            }
        //}
    }catch (error) {
        res.status(400).json({message: "error", error})
    }
    
} 

//========================================signIn==============================================
// const signIn = async(req, res) => {
//     // let {error} = signInValidationSchema.validate(req.body);
//     // if(error) {
//     //     res.status(400).json({message: "validation error", error})
//     // }else {
//         const  email = req.body;
//         // if (isLogged !== true) {
//         //     return res.status(400).json({ message: "isLogged must be set to true" });
//         // }
//         let foundedUser = await userModel.findOne({email: req.body.email});
//         // const foundedUser = await userModel.findOne({ email });
//         // let isLogged = req.body.isLogged;
//         if(foundedUser) {
//             let matched = bcrypt.compareSync(req.body.password, foundedUser.password)
//             if(matched) {
//                 let token = jwt.sign({id:foundedUser.id}, "gzr")
//                 res.status(200).json({message: "You are welcome", token})
//             }else {
//                 res.status(400).json({message: "Password is wrong"})
//             }
//         }else {
//             res.status(404).json({message: "User not found , you have to sign up"})
//         }
//     }

const signIn = async (req, res) => {
    try {
        const { email, password, isLoggedIn } = req.body;

        if (!email || !password || isLoggedIn !== true) {
            return res.status(400).json({ message: "Please provide email, password, and set isLogged to true to loggedIn" });
        }

        const foundedUser = await userModel.findOne({ email });

        if (foundedUser) {
            const matched = bcrypt.compareSync(password, foundedUser.password);
            if (matched) {
                const token = jwt.sign({ id: foundedUser.id }, "gzr");
                return res.status(200).json({ message: "You are welcome", token, email, password, isLoggedIn });
            } else {
                return res.status(400).json({ message: "Password is wrong" });
            }
        } else {
            return res.status(404).json({ message: "User not found, you have to sign up" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

//} 

//==============================changePassword==========================================
// const changePassword = async (req, res) => {
//     const {oldPassword, newPassword} = req.body;
//     const userId = req.user.id;
//     try{
//         const user = await userModel.findOne(userId);
//         if(!user) {
//             return res.status(404).json({ error: 'User not found.' });
//         }
//         const ismatch = await userModel.comparePassword(oldPassword);
//         if(ismatch) {
//             return res.status(400).json({ error: 'Old password is incorrect.' });
//         }
//         userModel.password = newPassword;
//         await userModel.save()
//         return res.status(200).json({ message: 'Password updated successfully.' });
//     }catch(error) {
//         return res.status(500).json({ error: 'Error changing password.' });
//     }

// }
const newPass = async (req, res) => {
//     try {

    
//     const {email, newPassword, oldPassword} = req.body;
//     const user = await userModel.findOne({email: email});
//     if(user) {
//         const passwordValid = await bcrypt.compare(oldPassword,user.password);
//         if(!passwordValid) {
//             return res.status(400).json({message: "password is not valid"})
//         }
//         const newHashPassword = await bcrypt.hash(newPassword, 10)
//         user.password = newHashPassword;
//         await user.save()
//         res.status(200).json({message: "password is changed"})
//     }else{
//         res.status(200).json({message: "Email is not found"})

//     }
//     } catch(err) {
//         res.status(400).json({error: err.message})
//     }
const { email, newPassword, oldPassword } = req.body;
try {
    // Input validation
    if (!email || !newPassword || !oldPassword) {
        return res.status(422).json({ message: "Missing required fields" });
    }

    const user = await userModel.findOne({ email: email });

    if (user) {
        const passwordValid = await bcrypt.compare(oldPassword, user.password);

        if (!passwordValid) {
            return res.status(401).json({ message: "Invalid old password" });
        }

        const newHashPassword = await bcrypt.hash(newPassword, 10);
        user.password = newHashPassword;
        await user.save();
        return res.status(200).json({ message: "Password has been changed" });
    } else {
        return res.status(404).json({ message: "Email not found" });
    }
} catch (err) {
    return res.status(500).json({ error: err.message });
}

 }
//==========================upDateUserData=======================================

const updateUser = async (req, res) => {
    try {

        const {age, userName} = req.body;
        const id = req.params.id
        const updateData = await userModel.findByIdAndUpdate(id, {
        age, userName
        }, {new: true})
        if(updateData) {
        res.status(200).send({message: "Successfully updated", updateData})
        }else{
        res.status(400).send("user not founded")
        }
    }catch(err) {
        return res.status(500).json({ error: err.message });
    }
}

//========================deleteUser===========================================
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const userDeleted = await userModel.findByIdAndDelete(id)
        if(userDeleted) {
            res.status(200).send("user deleted successfully")
        }else {
            res.status(400).send("user already has been deleted")
        }
    }catch(err) {
        return res.status(500).json({ error: err.message });
    } 
}

//=========================softDeleteUser===============================
const softDeleteUser = async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await userModel.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User has been soft deleted' });
    }catch(err) {
        return res.status(500).json({ error: err.message });
    }
}

//==============================logOut===========================================
    const logOut = async (req, res) => {
        try {
            const { isLoggedIn } = req.body;
    
            if (isLoggedIn === false) {
                res.status(200).json({ message: "You are logged out" });
            } else if (isLoggedIn === true) {
                res.status(200).json({ message: "You are logged in" });
            } else {
                res.status(400).json({ message: "Invalid isLogged value" });
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    
    





export {
    signUp,
    getAllUsers,
    signIn, 
    newPass,
    // changePassword
    updateUser,
    deleteUser,
    softDeleteUser,
    logOut
};






