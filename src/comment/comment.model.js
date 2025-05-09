import { Schema, model } from "mongoose";

const commentSchema = Schema({
    text:{
        type: String,
        required: [true, "Text is required"],
        maxLength: [100, "Text cannot exceed 100 characters"]
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