require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/** Give Request data if the data is in db we can find and user here */

const prices = [
  {
    sku: "abc",
    price: 10,
  },
  {
    sku: "def",
    price: 20,
  },
  {
    sku: "ghi",
    price: 30,
  },
  {
    sku: "klm",
    price: 40,
  },
  {
    sku: "xyz",
    price: 50,
  },
];

const categories = [
  {
    id: 1,
    name: "category 1",
  },
  {
    id: 2,
    name: "category 2",
  },
  {
    id: 3,
    name: "category 3",
  },
  {
    id: 4,
    name: "category 4",
  },
  {
    id: 5,
    name: "category 5",
  },
];

const products = [
  {
    id: 1,
    sku: "abc",
    productName: "name 1",
    category: 1,
  },
  {
    id: 2,
    sku: "def",
    productName: "name 2",
    category: 2,
  },
  {
    id: 3,
    sku: "ghi",
    productName: "name 1",
    category: 2,
  },
  {
    id: 4,
    sku: "klm",
    productName: "name 1",
    category: 3,
  },
  {
    id: 5,
    sku: "xyz",
    productName: "name 1",
    category: 1,
  },
];

// Define functions to retrieve price and category information
function getPrice(sku) {
  return prices.find((p) => p.sku === sku)?.price ?? null;
}

function getCategoryName(categoryId) {
  return categories.find((c) => c.id === categoryId)?.name ?? null;
}

// Route handler function
app.get("/api", (req, res) => {
  try {
    const result = products.map((product) => ({
      ...product,
      price: getPrice(product.sku),
      category: getCategoryName(product.category),
    }));

    res.json({ message: "Data retrieved successfully", result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});