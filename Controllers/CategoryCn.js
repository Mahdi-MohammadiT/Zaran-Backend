import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import fs from "fs";
import { __dirname } from "../app.js";
import Category from "../Models/CategoryMd.js";
import Product from "../Models/ProductMd.js";
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([{
      path: "supCategory",
      select: "title"
    }]);
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters({
      _id: req.params.id,
    })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([{
      path: "supCategory",
      select: "title"
    }]);
  const result = await features.execute();
  return res.status(200).json(result);
});
export const create = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  return res.status(201).json({
    message: "Category created successfully",
    data: category,
    success: true,
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  const product = await Product.find({ categoryId: id });
  if(product.length>0){
    return next(new HandleERROR("Category cannot be deleted as it is associated with products", 400));
  }
  const imagePath = `${__dirname}/Public/${category.image}`;
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
   await category.remove();
  return res.status(204).json({
    message: "Category deleted successfully",
    success: true,
  });
});
export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {title=null,image=null,supCategory=null} = req.body;
  const category = await Category.findById(id);
  if(image && image!=category.image){
    const imagePath = `${__dirname}/Public/${category.image}`;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
  category.title = title || category.title;
  category.image = image || category.image;
  category.supCategory = supCategory || category.supCategory;
  const newCategory = await category.save();
  return res.status(200).json({
    message: "Category updated successfully",
    success: true,
    data: newCategory,
  });
});

