import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    buyingPrice: {
      type: Number,
      required: [true, "Buying price is required"],
      min: 0,
    },
    sellingPrice: {
      type: Number,
      required: [true, "Selling price is required"],
      min: 0,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
