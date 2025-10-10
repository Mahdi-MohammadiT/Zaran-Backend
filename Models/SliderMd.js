import mongoose from "mongoose";
const sliderSchema=new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    link: {
        type: String,
        required: [true, "Link is required"]
    },
    path: {
        type: String,
        required: [true, "Path is required"],
        default: 'home'
    }
}, { timestamps: true })
const Slider = mongoose.model("Slider", sliderSchema);
export default Slider;
