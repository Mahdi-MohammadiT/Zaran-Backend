import mongoose from "mongoose";

const informationSchema = new mongoose.Schema({
    key:{
        type:String,
        required:[true,"Please provide a key"],
        trim:true
    },
    value:{
        type:String,
        required:[true,"Please provide a value"],
        trim:true
    }
   
},{_id:false});

const productSchema = new mongoose.Schema({
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: [true, "Brand ID is required"]
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category ID is required"]
    },
    title:{
        type:String,
        required:[true,"Please provide a product title"],
        trim:true,
        unique:[true,"Product title must be unique"]
    },
    description:{
        type:String,
        required:[true,"Please provide a product description"],
        trim:true
    },
    information:{
        type:[informationSchema],
        default:[]
    },
    defaultProductVariantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
    },
    productVariantIds:{
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ProductVariant"
            }
        ],
        default:[]
    },
    rate:{
        type:Number,
        default:0
    },
    rateCount:{
        type:Number,
        default:0
    },
    userBoughtProductIds:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        default:[]
    },
    images:{
        type:[String],
        default:[]
    },
    slug:{
        type:String,
        required:[true,"Please provide a product slug"],
        unique:[true,"Product slug must be unique"]
    },
    isPublished:{
        type:Boolean,
        default:true
    }

}, { timestamps: true })
productSchema.pre("save", function(next) {
    this.slug = this.title.toLowerCase().replace(/ /g, "-");
    next();
});
const Product = mongoose.model("Product", productSchema);
export default Product;
