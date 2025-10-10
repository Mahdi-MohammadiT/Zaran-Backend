import mongoose from "mongoose";
const variantSchema=new mongoose.Schema({
    type:{
        type:String,
        required:[true,"Variant type is required"],
        enum:["color","size"]
    },
    value:{
        type:String,
        required:[true,"Variant value is required"]
    }
},{timestamps:true})

const Variant=mongoose.model("Variant",variantSchema)
export default Variant