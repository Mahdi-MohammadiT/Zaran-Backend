import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import { __dirname } from "../app.js";
import Product from "../Models/ProductMd.js";
import User from "../Models/UserMd.js";
import Order from "../Models/OrderMd.js";
import ProductVariant from "../Models/ProductVariantMd.js";
import Comment from "../Models/CommentMd.js";
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Product, req.query, req.role)
    .addManualFilters(
      req.role == "admin" || req.role == "superAdmin"
        ? {}
        : {
            isPublished: true,
          }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "categoryId", select: "title" },
      { path: "brandId", select: "title" },
      { path: "defaultProductVariantId", populate: { path: "variantId" } },
      { path: "productVariantIds", populate: { path: "variantId" } },
    ]);
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Product, req.query, req.role)
    .addManualFilters(
      req.role == "admin" || req.role == "superAdmin"
        ? { _id: req.params.id }
        : {
            isPublished: true,
            _id: req.params.id,
          }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "categoryId", select: "title" },
      { path: "brandId", select: "title" },
      { path: "defaultProductVariantId", populate: { path: "variantId" } },
      { path: "productVariantIds", populate: { path: "variantId" } },
    ]);
  const result = await features.execute();
  let rate = false;
  let favorite = false;
  let bought = false;
  if (req.userId) {
    const user = await User.findById(req.userId);
    rate = user.ratedProducts.find((item) => item.toString() === req.params.id)
      ? true
      : false;
    favorite = user.favoriteProductIds.find(
      (item) => item.toString() === req.params.id
    )
      ? true
      : false;
    bought = user.boughtProductIds.find(
      (item) => item.toString() === req.params.id
    )
      ? true
      : false;
  }
  return res.status(200).json({
    ...result,
    rate,
    favorite,
    bought,
  });
});
export const create = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  return res.status(201).json({
    message: "Product created successfully",
    data: product,
    success: true,
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const order=await Order.find({
    'items.productId':req.params.id
  })
  if(order.length>0){
   return next(new HandleERROR("Product is associated with an order", 400))
  }
  await Product.findByIdAndDelete(req.params.id);
  await ProductVariant.deleteMany({ productId: req.params.id });
  await Comment.deleteMany({ productId: req.params.id });
  return res.status(200).json({
    message: "Product deleted successfully",
    success: true,
  });
});
export const update = catchAsync(async (req, res, next) => {
  const product=await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  });
  return res.status(200).json({
    message: "Product updated successfully",
    data: product,
    success: true,
  });
});
