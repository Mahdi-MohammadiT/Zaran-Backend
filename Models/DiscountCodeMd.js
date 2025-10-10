import mongoose from "mongoose";
const discountCodeSchema=new mongoose.Schema({
    code:{
        type:String,
        required:[true,"Discount code is required"],
        unique:[true,"Discount code must be unique"]
    },
    type:{
        type:String,
        enum:["percentage","amount"],
        required:[true,"Discount type is required"]
    },
    discountValue:{
        type:Number,
        required:[true,"Discount value is required"]
    },
    minCartValue:{
        type:Number,
    },
    maxCartValue:{
        type:Number,
    },
    startDate:{
        type:Date,
        required:[true,"Start date is required"],
        validate:{
            validator:function(value){
                return this.endDate.getTime() > value.getTime();
            },
            message:"Start date must be in the future"
        }
    },
    endDate:{
        type:Date,
        required:[true,"End date is required"],
        validate:{
            validator:function(value){
                return value.getTime() > Date.now();
            },
            message:"End date must be in the future"
        }
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    maxUserUsage:{
        type:Number,
        default:1
    },
    userIdUsed:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        default:[]
    }
},{timestamps:true})
const DiscountCode=mongoose.model("DiscountCode",discountCodeSchema)
export default DiscountCode