import { catchAsync } from "vanta-api";
import Product from "../Models/ProductMd.js";
import Category from "../Models/CategoryMd.js";
import Brand from "../Models/BrandMd.js";
export const search = catchAsync(async (req, res, next) => {
  const { query } = req.query;
  const products = (
    await Product.find({ title: { $regex: query, $options: "i" } }).select(
      "title images price slug"
    )
  )
    .sort("-createdAt")
    .limit(10);
  const categories = (
    await Category.find({ title: { $regex: query, $options: "i" } }).select(
      "title image slug"
    )
  )
    .sort("-createdAt")
    .limit(10);
  const brands = (
    await Brand.find({ title: { $regex: query, $options: "i" } }).select(
      "title image slug"
    )
  )
    .sort("-createdAt")
    .limit(10);
  if (products.length === 0 && categories.length === 0 && brands.length === 0) {
    return res.status(404).json({
      success: false,
      data: { products, categories, brands },

      message: "No results found",
    });
  }
  return res.status(200).json({
    success: true,
    data: { products, categories, brands },
    message: "Search results",
  });
});
