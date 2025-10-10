import { Router } from "express";
import {
  create,
  getAll,
  remove,
  changePublishStatus,
  getAllByProduct,
} from "../Controllers/CommentCn.js";
import IsAdmin from "../Middlewares/IsAdmin.js";
import IsLogin from "../Middlewares/IsLogin.js";
const commentRouter = Router();
commentRouter.route("/").get(IsAdmin, getAll).post(IsLogin, create);
commentRouter
  .route("/:id")
  .delete(IsAdmin, remove)
  .patch(IsAdmin, changePublishStatus)
  .get(getAllByProduct);
export default commentRouter;
