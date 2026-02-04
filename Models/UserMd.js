import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^(\+98|0)?9\d{9}$/, "Invalid phone number format"],
    unique: [true, "Phone number must be unique"],
  },
  nationalCode: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  birthDate: {
    type: Date,
  },
  password: {
    type: String,
    default:''
  },
  role: {
    type: String,
    enum: ["user", "admin", "superAdmin"],
    default: "user",
  },
  favoriteProductIds: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    default: [],
  },
  boughtProductIds: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    default: [],
  },
  addressIds: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    default: [],
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  ratedProducts: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    default: [],
  },
},{timestamps:true});
const User = mongoose.model("User", userSchema);
export default User;
