import mongoose from "mongoose";

const basketSchema = new mongoose.Schema({
 userId: {type: String, required},
 productId: {type: String, required}
});

export default mongoose.model("Product", productSchema);
