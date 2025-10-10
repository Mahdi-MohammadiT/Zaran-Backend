import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import { __dirname } from "../app.js";
import Product from "../Models/ProductMd.js";
import Order from "../Models/OrderMd.js";
import ProductVariant from "../Models/ProductVariantMd.js";
export const getAllProductVariantOfProducts = catchAsync(
  async (req, res, next) => {
    const features = new ApiFeatures(ProductVariant, req.query, req.role)
      .addManualFilters({ productId: req.params.id })
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .populate("variantId");
    const result = await features.execute();
    return res.status(200).json(result);
  }
);
export const create = catchAsync(async (req, res, next) => {
  const productVariant = await ProductVariant.create(req.body);
  const product = await Product.findById(req.body.productId);
  product.productVariantIds.push(productVariant._id);
  if (!product.defaultProductVariantId) {
    product.defaultProductVariantId = productVariant._id;
  }
  const newProduct = await product.save();
  return res.status(201).json({
    message: "ProductVariant created successfully",
    data: newProduct,
    success: true,
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const order = await Order.find({
    "items.productVariantId._id": req.params.id,
  });
  if (order.length > 0) {
    return next(new HandleERROR("Product is associated with an order", 400));
  }
  const prv = await ProductVariant.findByIdAndDelete(req.params.id);
  const product = await Product.findById(prv.productId);
  product.productVariantIds = product.productVariantIds.filter(
    (id) => id.toString() !== prv._id.toString()
  );
  if (product.defaultProductVariantId.toString() == prv._id.toString()) {
    product.defaultProductVariantId = product.productVariantIds[0] || null;
  }
  await product.save();
  return res.status(200).json({
    message: "Product deleted successfully",
    success: true,
  });
});
export const update = catchAsync(async (req, res, next) => {
  const productVariant = await ProductVariant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  return res.status(200).json({
    message: "Product updated successfully",
    data: productVariant,
    success: true,
  });
});
