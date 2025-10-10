import ApiFeatures, { catchAsync } from "vanta-api";
import Order from "../Models/OrderMd";

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Order, req.query, req.role)
    .addManualFilters(
      req?.role == "admin" || req?.role == "superAdmin"
        ? {}
        : { userId: req.userId }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "userId", select: "fullName phoneNumber" },
      { path: "items.productId", select: "title images price slug" },
    ]);
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Order, req.query, req.role)
    .addManualFilters(
      req?.role == "admin" || req?.role == "superAdmin"
        ? { _id: req.params.id }
        : { $and: [{ _id: req.params.id }, { userId: req.userId }] }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "userId", select: "fullName phoneNumber" },
      { path: "items.productId", select: "title images price slug" },
      { path: "items.productVariantId.variantId" },
      { path: "discountCode", select: "code type discountValue" },
      { path: "items.categoryId" },
      { path: "items.brandId" },
    ]);
  const result = await features.execute();
  return res.status(200).json(result);
});
export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { userId = null, ...otherData } = req.body;
  const order = await Order.findByIdAndUpdate(id, otherData, {
    new: true,
    runValidators: true,
  }).populate([
      { path: "userId", select: "fullName phoneNumber" },
      { path: "items.productId", select: "title images price slug" },
      { path: "items.productVariantId.variantId" },
      { path: "discountCode", select: "code type discountValue" },
      { path: "items.categoryId" },
      { path: "items.brandId" },
    ])
    return res.status(200).json({
        message:'order updated successfully',
        success:true,
        data:order
    })
});
