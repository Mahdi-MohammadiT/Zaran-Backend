import mongoose from "mongoose";
const itemSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    ProductVariantId:{
        type:Object,
        required:true
    },
    cartQuantity:{
        type:Number,
        required:true,
        default:1
    },
    price:{
        type:Number,
        required:true
    },
    priceAfterDiscount:{
        type:Number,
        required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Brand",
        required:true
    }
},{_id:false})
const orderSchema=new mongoose.Schema({
    items:{
        type:[itemSchema],
        default:[]
    },
    totalPrice:{
        type:Number,
        required:true
    },
    totalPriceAfterDiscount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    } ,
    orderStatus:{
        type:String,
        enum:["pending","success","failed"],
        default:"pending"
    },
    discountCodeId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    authority:{
        type:String,
    },
    refId:{
        type:String,
    }

},{timestamps:true})

const Order=mongoose.model("Order",orderSchema);
export default Order;