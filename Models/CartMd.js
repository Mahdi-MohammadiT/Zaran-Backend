import mongoose from "mongoose";
const itemSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
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
        default:0
    },
    productVariantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ProductVariant",
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

const cartSchema=new mongoose.Schema({
    items:{
        type:[itemSchema],
        default:[]
    },
    totalPrice:{
        type:Number,
        default:0
    },
    totalPriceAfterDiscount:{
        type:Number,
        default:0
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

const Cart=mongoose.model("Cart",cartSchema)
export default Cart