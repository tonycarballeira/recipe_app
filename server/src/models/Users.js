import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, uniwu: true },
    password: { type: String, required: true },
    savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes"}]
});

export const UserModel = mongoose.model("users", UserSchema);

