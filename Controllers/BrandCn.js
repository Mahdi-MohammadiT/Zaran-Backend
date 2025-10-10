import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import fs from "fs";
import { __dirname } from "../app.js";
import Brand from "../Models/BrandMd.js";
import Product from "../Models/ProductMd.js";
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Brand, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Brand, req.query, req.role)
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
  const brand = await Brand.create(req.body);
  return res.status(201).json({
    message: "Brand created successfully",
    data: brand,
    success: true,
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  const product = await Product.find({ brandId: id });
  if(product.length>0){
    return next(new HandleERROR("Brand cannot be deleted as it is associated with products", 400));
  }
  const imagePath = `${__dirname}/Public/${brand.image}`;
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
   await brand.remove();
  return res.status(204).json({
    message: "Brand deleted successfully",
    success: true,
  });
});
export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {title=null,image=null} = req.body;
  const brand = await Brand.findById(id);
  if(image && image!=brand.image){
    const imagePath = `${__dirname}/Public/${brand.image}`;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
  brand.title = title || brand.title;
  brand.image = image || brand.image;
  const newBrand = await brand.save();
  return res.status(200).json({
    message: "Brand updated successfully",
    success: true,
    data: newBrand,
  });
});

