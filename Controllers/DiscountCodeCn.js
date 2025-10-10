import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import DiscountCode from "../Models/DiscountCodeMd.js";
import Cart from "../Models/CartMd.js";
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(DiscountCode, req.query, req?.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(DiscountCode, req.query, req.role)
    .addManualFilters({
      _id: req.params.id,
    })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const create = catchAsync(async (req, res, next) => {
  const discountCode = await DiscountCode.create(req.body);
  return res.status(201).json({
    message: "Discount code created successfully",
    data: discountCode,
    success: true,
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const discountCode = await DiscountCode.findById(id);
  if (!discountCode || discountCode.userIdUsed.length !== 0) {
    return next(new HandleERROR("Discount code not found or in use", 404));
  }
  await discountCode.remove();
  return res.status(204).json({
    message: "Discount code deleted successfully",
    success: true,
  });
});
export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { type = null, discountValue = null, ...otherData } = req.body;
  const discountCode = await DiscountCode.findById(id);
  if (!discountCode) {
    return next(new HandleERROR("Discount code not found", 404));
  }
  if (
    discountCode.userIdUsed.length > 0 &&
    ((type && type !== discountCode.type) ||
      (discountValue && discountValue !== discountCode.discountValue))
  ) {
    return next(
      new HandleERROR(
        "Discount code is in use and you cannot change its type or value",
        400
      )
    );
  }
  const updatedDiscountCode = await DiscountCode.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  return res.status(200).json({
    message: "Discount code updated successfully",
    data: updatedDiscountCode,
    success: true,
  });
});

export const discountValidation = (discountCode, totalPrice, userId) => {
  if (!discountCode?.isPublished) {
    return { success: false, message: "Discount code is not available" };
  }
  if (
    new Date(discountCode.startDate) > new Date() ||
    new Date(discountCode.endDate) < new Date()
  ) {
    return {
      success: false,
      message: "Discount code is not started yet or has expired",
    };
  }
  if (discountCode.minCartValue && totalPrice < discountCode.minCartValue) {
    return {
      success: false,
      message: `Discount code requires a minimum cart value of ${discountCode.minCartValue}`,
    };
  }
  if (discountCode.maxCartValue && totalPrice > discountCode.maxCartValue) {
    return {
      success: false,
      message: `Discount code requires a maximum cart value of ${discountCode.maxCartValue}`,
    };
  }
  if (
    discountCode.userIdUsed.filter((id) => id.toString() === userId.toString())
      .length >= discountCode.maxUserUsage
  ) {
    return {
      success: false,
      message: "You have reached the maximum usage for this discount code",
    };
  }
  return { success: true };
};

export const checkDiscountCode = catchAsync(async (req, res, next) => {
  const { code = null } = req.body;
  if (!code) {
    return next(new HandleERROR("Discount code is required", 400));
  }
  const userId = req.userId;
  const cart = await Cart.findOne({ userId });
  const discountCode = await DiscountCode.findOne({ code: code.trim() });
  if (!discountCode) {
    return next(new HandleERROR("Discount code is invalid", 404));
  }
  const validation = discountValidation(
    discountCode,
    cart.totalPriceAfterDiscount,
    userId
  );
  if (!validation.success) {
    return next(new HandleERROR(validation.message, 400));
  }
  const priceAfterDiscount =
    discountCode.type === "percentage"
      ? cart.totalPriceAfterDiscount -
        (cart.totalPriceAfterDiscount * discountCode.discountValue) / 100
      : cart.totalPriceAfterDiscount - discountCode.discountValue;
  return res.status(200).json({
    message: "Discount code is valid",
    data: {
      priceAfterDiscount: priceAfterDiscount,
    },
    success: true,
  });
});
