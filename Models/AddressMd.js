import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  receiverPhoneNumber: {
    type: String,
    required: [true, "Receiver phone number is required"],
    match: [/^(\+98|0)?9\d{9}$/, "Invalid phone number format"],
  },
   receiverFullname: {
    type: String,
    required: [true, "Receiver fullname is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required"],
    match: [/^\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b$/, "Invalid postal code format"],
  },
  province: {
    type: String,
    required: [true, "Province is required"],
  },
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
  houseNumber: {
    type: String,
    required: [true, "House number is required"],
  },
},{timestamps: true});

const Address = mongoose.model("Address", addressSchema);

export default Address;