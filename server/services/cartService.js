import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

const toPlain = (m) => {
  if (!m) return {};
  if (m instanceof Map) return Object.fromEntries(m);
  if (typeof m.toObject === "function") return m.toObject();
  return { ...m };
};

const normalize = (obj = {}) =>
  Object.keys(obj)
    .sort()
    .reduce((a, k) => {
      a[k] = String(obj[k]);
      return a;
    }, {});

async function getCartItems(userId) {
  let cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

async function addItem(userId, { productId, quantity, selectedVariants = {} }) {
  const product = await Product.findById(productId).where({ deletedAt: null });
  if (!product) throw { status: 404, message: "Product not found" };

  const selNorm = normalize(selectedVariants);

  let price = product.productPrice;
  if (product.variations?.length && Object.keys(selNorm).length) {
    const matched = product.variations.find((v) => {
      const attrs = normalize(toPlain(v.attributes));
      return Object.keys(selNorm).every((k) => attrs[k] === selNorm[k]);
    });
    if (!matched)
      throw {
        status: 400,
        message: "Selected variants are invalid for this product",
      };
    if (typeof matched.price === "number") price = matched.price;
    if (typeof matched.stock === "number" && matched.stock < quantity) {
      throw { status: 400, message: "Insufficient stock for selected variant" };
    }
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = new Cart({ user: userId, items: [] });

  const idx = cart.items.findIndex((item) => {
    const sameProduct = item.product.toString() === productId;
    const itemSel = normalize(toPlain(item.selectedVariants));
    return sameProduct && JSON.stringify(itemSel) === JSON.stringify(selNorm);
  });

  if (idx > -1) {
    cart.items[idx].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity, selectedVariants, price });
  }

  const updated = await cart.save();
  await updated.populate("items.product");
  return updated;
}

async function updateItem(
  userId,
  { productId, quantity, selectedVariants = {} }
) {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw { status: 404, message: "Cart not found" };
  }

  const selNorm = normalize(selectedVariants);
  const itemIndex = cart.items.findIndex((item) => {
    const sameProduct = item.product.toString() === productId;
    const itemSel = normalize(toPlain(item.selectedVariants));
    return sameProduct && JSON.stringify(itemSel) === JSON.stringify(selNorm);
  });

  if (itemIndex === -1) {
    throw { status: 404, message: "Item not found in cart" };
  }

  cart.items[itemIndex].quantity = quantity;
  const updatedCart = await cart.save();
  await updatedCart.populate("items.product");
  return updatedCart;
}

async function removeItem(userId, { productId, selectedVariants = {} }) {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw { status: 404, message: "Cart not found" };
  }

  const selNorm = normalize(selectedVariants);
  const itemIndex = cart.items.findIndex((item) => {
    const sameProduct = item.product.toString() === productId;
    const itemSel = normalize(toPlain(item.selectedVariants));
    return sameProduct && JSON.stringify(itemSel) === JSON.stringify(selNorm);
  });

  if (itemIndex === -1) {
    throw { status: 404, message: "Item not found in cart" };
  }

  cart.items.splice(itemIndex, 1);
  const updatedCart = await cart.save();
  await updatedCart.populate("items.product");
  return updatedCart;
}

export default { getCartItems, addItem, removeItem, updateItem };
