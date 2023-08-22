import Basket from '../models/basket';

export const addToBasket = async(req, res) => {
    try {
        const {productId, userId} = req.body;
        const basket = new Basket({userId, productId });
        await basket.save();
        res.status(201).json({ message: "Product added successfully!" });
    } catch(error) {
        res.status(500).json({ error: "Error while adding product" });
    }
}

export const getBasket = async(req, res) => {
    try {
        const basket = await Basket.find(req.params.userId);
        if (!basket) {
        return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(basket);
    } catch (e) {
        res.status(500).json({ error: "Error while fetching product" });
    }
}

export const deleteProductFromBasket = async (req, res) => {
    try {
      const product = await Basket.findByIdAndDelete(req.params.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Error while deleting product" });
    }
  };