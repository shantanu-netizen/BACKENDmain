import mongoose from "mongoose";
const { Schema } = mongoose;
const DimensionsSchema = new Schema(
  {
    width: Number,
    height: Number,
    depth: Number,
  },
  { _id: false },
);
const ReviewSchema = new Schema(
  {
    rating: { type: Number, required: true },
    comment: String,
    date: { type: Date, default: Date.now },
    reviewerName: String,
    reviewerEmail: String,
  },
  { _id: false },
);

const MetaSchema = new Schema(
  {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    barcode: String,
    qrCode: String,
  },
  { _id: false },
);

const productSchema = new Schema({
  // external numeric id from your source
  id: { type: Number, unique: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  dimensions: DimensionsSchema,
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  reviews: [ReviewSchema],
  returnPolicy: String,
  minimumOrderQuantity: Number,
  meta: MetaSchema,
  thumbnail: String,
  images: [String],
});
const productsModel = mongoose.model("Product", productSchema);

export default productsModel;
