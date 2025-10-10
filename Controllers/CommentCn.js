import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";

import Comment from "../Models/CommentMd.js";
import Product from "../Models/ProductMd.js";
import User from "../Models/UserMd.js";

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Comment, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "productId", select: "title images" },
      { path: "userId", select: "fullName phoneNumber" },
    ]);
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getAllByProduct = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Comment, req.query, req.role)
    .addManualFilters(
      req.role == "admin" || req.role == "superAdmin"
        ? { productId: req.params.id }
        : { $and: [{ productId: req.params.id }, { isPublished: true }] }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "productId", select: "title images" },
      { path: "userId", select: "fullName" },
    ]);
  const result = await features.execute();
  return res.status(200).json(result);
});

export const create = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.body.productId);
  let userBought = product.userBoughtProductIds.find(
    (user) => user.userId.toString() === req.userId
  );
  const user = await User.findById(req.userId);
  let userRated = user.ratedProducts.find(
    (product) => product.productId.toString() === req.body.productId
  );

  const comment = await Comment.create({
    ...req.body,
    userId: req.userId,
    isBought: userBought ? true : false,
  });
  if (Boolean(userBought) && comment?.rating && !userRated) {
    product.rate =
      (product.rate * product.rateCount + comment.rating) /
      (product.rateCount + 1);
    product.rateCount += 1;
    await product.save();
  }
  return res.status(201).json({
    message: "Comment created successfully",
    data: comment,
    success: true,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Comment.findByIdAndDelete(id);

  return res.status(204).json({
    message: "Comment deleted successfully",
    success: true,
  });
});
export const changePublishStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  comment.isPublished = !comment.isPublished;
  const updatedComment = await comment.save();
  return res.status(200).json({
    message: "Comment status changed successfully",
    success: true,
    data: updatedComment,
  });
});
