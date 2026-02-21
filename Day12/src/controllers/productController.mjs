import productsModel from "../models/productsModel.mjs";
const addProduct = async (req, res) => {
  try {
    let data = req.body;
    const newProduct = await productsModel.create(data);
    return res.status(201).json(newProduct);
  } catch (error) {
    if (error.message.includes("duplicate")) {
      return res.status(400).json({ message: "Product already exists" });
    } else if (error.message.includes("validation")) {
      return res.status(400).json({ message: "Invalid product data" });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};

const getProducts = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skipValue = (page - 1) * limit;
    const products = await productsModel.aggregate([
      {
        $match: { stock: { $gt: 0 } }, // stage 1
      },
      {
        $project: {
          // stage 2
          id: 1,
          title: 1,
          price: 1,
          stock: 1,
          availabilityStatus: 1,
          _id: 0,
        },
      },
      {
        $sort: { id: 1 }, // stage 3
      },
      {
        $skip: skipValue, // stage 4
      },
      {
        $limit: limit, // stage 5
      },
    ]);
    return res
      .status(200)
      .json({
        message: "Products fetched successfully",
        data: products,
        total: products.length,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export { addProduct, getProducts, getProductById };
