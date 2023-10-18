import express from 'express';
import { getAllUsers, signUp } from './user.controller.js';
import { signIn } from './user.controller.js';
import { signUpValidationSchema } from './user.validation.js';
import { signInValidationSchema } from './user.validation.js';
import validation from '../../middleWare/validation.js';
import { updateUser } from './user.controller.js';
import { deleteUser } from './user.controller.js';
import { softDeleteUser } from './user.controller.js';
// import { changePassword } from './user.controller.js';//added
import { newPass } from './user.controller.js';
import { logOut } from './user.controller.js';
const userRoutes = express.Router();
userRoutes.get("/user", getAllUsers)
userRoutes.post("/user/signUp", validation(signUpValidationSchema), signUp);
userRoutes.post("/user/login", validation(signInValidationSchema), signIn);
// userRoutes.patch('/changePassword', changePassword);
userRoutes.post("/newPassword", newPass);
userRoutes.put("/updateUser/:id", updateUser);
userRoutes.delete("/deletedUser/:id", deleteUser);
userRoutes.patch("/users/:userId", softDeleteUser);
userRoutes.delete("/logOut", logOut)
export default userRoutes;
