const Sweet = require("../models/Sweet");
const jwt = require("jsonwebtoken");

//Adding sweet
//POST : /api/sweets
// Access: private/admin

const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
    });

    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ error: message });
  }
};

//Get all sweets
//GET :/api/sweets
//access Private

const getSweet = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Searching the sweet
//GET: /api/sweets/search
//access : protectedd

const searchSweet = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update the sweet by Admin
//PUT: /api/sweets/:id
//acess : admin

const updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.name = req.body.name ?? sweet.name;
    sweet.category = req.body.category ?? sweet.category;
    sweet.price = req.body.price ?? sweet.price;
    sweet.quantity = req.body.quantity ?? sweet.quantity;

    const updatedSweet = await sweet.save();
    res.json(updatedSweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delteting the sweet
// DELETE /api/sweets/:id
//acess : admin

const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (sweet) {
      await product.deleteOne();
      res.json({ message: "Product Deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Purchase a sweet
//POST : /api/sweets/:id/purchase
//access  protect

const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }
    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: "Item is out of stock" });
    }

    sweet.quantity = sweet.quantity = -1;
    await sweet.save();

    res.json({
      message: "Sweet added succesfully",
      sweet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Restocking the sweet
//POST : /api/sweets/:id/restock
//access : Admin

const restockSweet = async (req, res) => {
  try {
    // 1. Get amount from request body
    const amount = req.body.amount;

    // 2. Validate amount
    if (amount === undefined) {
      return res.status(400).json({ message: "amount is required" });
    }

    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "amount must be greater than 0" });
    }

    // 3. Find the sweet
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    // 4. Increase quantity
    sweet.quantity = sweet.quantity + amount;

    // 5. Save updated sweet
    await sweet.save();

    // 6. Send response
    res.json({
      message: "Sweet restocked successfully",
      sweet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports =
{
  addSweet,
  getSweet,
  searchSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
}
