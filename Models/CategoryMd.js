import mongoose from "mongoose";
const categorySchema=new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    supCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    slug: {
        type: String,
        required: [true, "Slug is required"],
        unique: true
    }
}, { timestamps: true })
categorySchema.pre("save", function (next) {
    this.slug = this.title.toLowerCase().replace(/ /g, "-");
    next();
});
const Category = mongoose.model("Category", categorySchema);
export default Category;
