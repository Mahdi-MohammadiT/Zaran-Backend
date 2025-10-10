import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    isBought:{
        type:Boolean,
        default:false
    },
    isPublished:{
        type:Boolean,
        default:false
    }
})
const Comment=mongoose.model("Comment",commentSchema);
export default Comment;
