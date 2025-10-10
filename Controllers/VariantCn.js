
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Variant from "../Models/VariantMd.js";
import ProductVariant from "../Models/ProductVariantMd.js";
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Variant, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Variant, req.query, req.role)
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
  const variant = await Variant.create(req.body);
  return res.status(201).json({
    message: "Variant created successfully",
    data: variant,
    success: true,
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const variant = await Variant.findById(id);
  const productVariant = await ProductVariant.find({ variantId: id });
  if(productVariant.length>0){
    return next(new HandleERROR("Variant cannot be deleted as it is associated with products", 400));
  }

   await variant.remove();
  return res.status(204).json({
    message: "Variant deleted successfully",
    success: true,
  });
});
export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const variant = await Variant.findByIdAndUpdate(id,req.body,{
    new:true,runValidators:true
  });
  return res.status(200).json({
    message: "Variant updated successfully",
    success: true,
    data: variant,
  });
});

