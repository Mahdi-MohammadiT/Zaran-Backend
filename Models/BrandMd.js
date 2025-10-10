import mongoose from "mongoose";
const brandSchema=new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        unique: [true, "Title must be unique"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    slug: {
        type: String,
        required: [true, "Slug is required"],
        unique: true
    }
}, { timestamps: true })
brandSchema.pre("save", function (next) {
    this.slug = this.title.toLowerCase().replace(/ /g, "-");
    next();
});
const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
