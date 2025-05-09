import { Schema, model } from "mongoose";

const publicationSchema = Schema({
    title:{
        type: String,
        required: [true, "Title is required"],
        maxLength: [200, "Title cannot exceed 200 characters"]
    },
    text:{
        type: String,
        required: [true, "Text is required"],
        maxLength: [500, "Text cannot exceed 500 characters"]
    },
    date:{
        type: Date,
        default: Date.now
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category',
        required: true,
    },
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Comment"
    }]
})

export default model("Publication", publicationSchema)