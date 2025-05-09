import { Schema, model } from "mongoose";

const commentSchema = Schema({
    user:{
        type: String,
        required: [true, "User is required"],
        maxLength: [50, "User cannot exceed 50 characters"]
    },
    text:{
        type: String,
        required: [true, "Text is required"],
        maxLength: [100, "Text cannot exceed 100 characters"]
    },
    date:{
        type: Date,
        default: Date.now
    },
    publication: { 
        type: Schema.ObjectId, 
        ref: "Publication",
        required: true,
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Comment", commentSchema)