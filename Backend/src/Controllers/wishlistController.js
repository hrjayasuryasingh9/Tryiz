import * as wishlistServices from "../Services/wishlistServices.js";

const addToWishlist = async (req, res) => {
  try {
    const uid = req.user.id;
    const pid = Number(req.body.pid);

    const item = await wishlistServices.addToWishlist(uid, pid);
    res
      .status(200)
      .json({ message: "the product is added to the cart", data: item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getWishlistItems = async (req, res) => {
  try {
    const uid = req.user.id;
    const wishlist = await wishlistServices.getWishlistItems(uid);
    res.status(200).json({ data: wishlist });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const deletefromWishlist = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const item = await wishlistServices.deletefromWishlist(id);
    res
      .status(200)
      .json({ message: "The item is removed from the wishlist", data: item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getWishlistCount = async (req, res) => {
  try {
    const uid = req.user.id;
    const count = await wishlistServices.getWishlistCount(uid);

    res.status(200).json({ message: "Here is the count", data: count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};
export {
  addToWishlist,
  getWishlistItems,
  deletefromWishlist,
  getWishlistCount,
};
