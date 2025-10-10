import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Address from "../Models/AddressMd.js";
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Address, req.query, req.role)
    .addManualFilters(
      req.role == "admin" || req.role == "superAdmin"
        ? {}
        : { userId: req.userId }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: "userId", select: "fullName phoneNumber" });
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Address, req.query, req.role)
    .addManualFilters(
      req.role == "admin" || req.role == "superAdmin"
        ? { _id: req.params.id }
        : { $and: [{ userId: req.userId }, { _id: req.params.id }] }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: "userId", select: "fullName phoneNumber" });
  const result = await features.execute();
  return res.status(200).json(result);
});
export const create = catchAsync(async (req, res, next) => {
  const address = await Address.create({ ...req.body, userId: req.userId });
  return res.status(201).json({
    message: "Address created successfully",
    data: address,
    success: true,
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const address=await Address.findById(id);
  if(address.userId.toString() !== req.userId.toString())
    return next(new HandleERROR("You are not authorized to delete this address", 403));
  await Address.findByIdAndDelete(id);
  return res.status(200).json({
    message: "Address deleted successfully",
    success: true,
  });
});
export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { userId = null, ...otherData } = req.body;
  const address = await Address.findById(id);
  if(address.userId.toString() !== req.userId.toString())
    return next(new HandleERROR("You are not authorized to update this address", 403));
  const updatedAddress = await Address.findByIdAndUpdate(id, otherData, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    message: "Address updated successfully",
    success: true,
    data: updatedAddress,
  });
});
