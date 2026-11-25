import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    requird: true,
    minLength: 2,
    maxLength: 100,
  },
  description: {
    type: String,
    required: true,
    minLength: 50,
    maxLength: 500,
  },
  images: {
    type: [
      {
        type: String,
        trim: true,
        required: [true, "Image URL cannot be empty"],
      },
    ],
    validate: {
      validator: (images) => images <= 5,
      message: "A product can have at most 5 images",
    },
  },
  price: {
    amount: {
      type: Number,
      requird: true,
    },
    currency: {
      type: String,
      required: true,
      enum: ["AFG", "USD"],
      default: "AFG",
    },
  },
  sizes: [
    {
      size: {
        type: String,
        required: true,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
      },
      stock: { type: Number, default: 0, min: 0, required: true },
    },
  ],
  seller: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

export default Product;
