import ApiFeatures, { catchAsync } from "vanta-api";
import Slider from "../Models/SliderMd.js";
import fs from 'fs'
import { __dirname } from "../app.js";
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Slider, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const create = catchAsync(async (req, res, next) => {
  const slider = await Slider.create(req.body);
  return res.status(201).json({
    message: "Slider created successfully",
    data: slider,
    success: true,
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const slider = await Slider.findByIdAndDelete(id);
  const imagePath = `${__dirname}/Public/${slider.image}`;
  if(fs.existsSync(imagePath)){
    fs.unlinkSync(imagePath);
  }
  return res.status(204).json({
    message: "Slider deleted successfully",
    success: true,
  });
});