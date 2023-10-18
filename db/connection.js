import mongoose from "mongoose";
export const connection = () => {
    mongoose.connect("mongodb+srv://Trello2:trello@cluster0.sho7f5o.mongodb.net/")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(`DB error ${err}`))
}