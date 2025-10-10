import mongoose from "mongoose";
const productVariantSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
      required: [true, "Variant ID is required"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity must be at least 0"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be at least 0"],
    },
    discount: {
      type: Number,
      required: [true, "Discount is required"],
      min: [0, "Discount must be at least 0"],
      max: [100, "Discount must be at most 100"],
    },
    priceAfterDiscount: {
      type: Number,
      required: [true, "Price after discount is required"],
      validate: {
        validator: function (value) {
          return value === this.price * (1 - this.discount / 100);
        },
        message: "Price after discount is incorrect",
      },
    },
  },
  { timestamps: true }
);
const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
export default ProductVariant;
