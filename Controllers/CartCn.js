import { catchAsync } from "vanta-api";
import Cart from "../Models/CartMd.js";
import ProductVariant from "../Models/ProductVariantMd.js";
import Product from "../Models/ProductMd.js";
export const getCart = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const cart = await Cart.findOne({ userId }).populate([
    { path: "items.productId", select: "title images slug isPublished" },
    { path: "items.productVariantId" },
    { path: "items.categoryId", select: "title slug" },
    { path: "items.brandId", select: "title slug" },
  ]);
  let newTotalPrice = 0;
  let newTotalPriceAfterDiscount = 0;
  let messageList = [];
  cart.items = cart.items.filter((item) => {
    if (!item?.productId?.isPublished) {
      messageList.push(`${item?.productId?.title} is not available`);
      return false;
    }
    if (item.productVariantId?.quantity < item.cartQuantity) {
      messageList.push(
        `${item?.productId?.title} is not available in the requested quantity`
      );
      item.cartQuantity = item.productVariantId?.quantity;
      if (item.cartQuantity === 0) {
        return false;
      }
    }
    newTotalPrice += item?.productVariantId?.price * item.cartQuantity;
    newTotalPriceAfterDiscount +=
      item?.productVariantId?.priceAfterDiscount * item.cartQuantity;
    return true;
  });
  if (
    cart.totalPrice !== newTotalPrice ||
    cart.totalPriceAfterDiscount !== newTotalPriceAfterDiscount
  ) {
    cart.totalPrice = newTotalPrice;
    cart.totalPriceAfterDiscount = newTotalPriceAfterDiscount;
    messageList.push("Cart prices updated");
    await cart.save();
  }
  const updatedCart = await Cart.findById(cart._id).populate([
    { path: "items.productId", select: "title images slug isPublished" },
    { path: "items.productVariantId" },
    { path: "items.categoryId", select: "title slug" },
    { path: "items.brandId", select: "title slug" },
  ]);
  return res.status(200).json({
    success: true,
    data: updatedCart,
    message: messageList,
  });
});

export const clearCart = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { items: [], totalPrice: 0, totalPriceAfterDiscount: 0 },
    { new: true, runValidators: true }
  );
  return res.status(200).json({
    success: true,
    data: cart,
    message: "Cart cleared",
  });
});
export const addItemToCart = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const { productVariantId } = req.body;
  const cart = await Cart.findOne({ userId });
  let add=false
  cart.items=cart.items?.map((item)=>{
    if(item.productVariantId.toString()==productVariantId.toString()){
        add=true
        item.cartQuantity+=1
        cart.totalPrice+=item.price
        cart.totalPriceAfterDiscount+=item.priceAfterDiscount
    }
    return item
  })
  if(!add){
    const productVariant = await ProductVariant.findById(productVariantId);
    const product = await Product.findById(productVariant.productId);
    cart.items.push({
      productId: product._id,
      productVariantId: productVariant._id,
      cartQuantity: 1,
      price: productVariant.price,
      priceAfterDiscount: productVariant.priceAfterDiscount,
    });
    cart.totalPrice += productVariant.price;
    cart.totalPriceAfterDiscount += productVariant.priceAfterDiscount;
  }
  await cart.save();
  const updatedCart = await Cart.findById(cart._id).populate([
    { path: "items.productId", select: "title images slug isPublished" },
    { path: "items.productVariantId" },
    { path: "items.categoryId", select: "title slug" },
    { path: "items.brandId", select: "title slug" },
  ]);
  return res.status(200).json({
    success: true,
    data: updatedCart,
    message: "Item added to cart",
  });
});
export const removeItemFromCart = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const { productVariantId } = req.body;
  const cart = await Cart.findOne({ userId });
  cart.items = cart.items.filter((item) => {
    if (item.productVariantId.toString() === productVariantId) {
      item.cartQuantity -= 1;
      cart.totalPrice -= item.price;
      cart.totalPriceAfterDiscount -= item.priceAfterDiscount;
      if (item.cartQuantity === 0) {
        return false;
      }
    }
    return true;
  });
  await cart.save();
  const updatedCart = await Cart.findById(cart._id).populate([
    { path: "items.productId", select: "title images slug isPublished" },
    { path: "items.productVariantId" },
    { path: "items.categoryId", select: "title slug" },
    { path: "items.brandId", select: "title slug" },
  ]);
  return res.status(200).json({
    success: true,
    data: updatedCart,
    message: "Item removed from cart",
  });
});
