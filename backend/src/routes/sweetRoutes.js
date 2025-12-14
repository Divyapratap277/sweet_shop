const express = require("express");
const { auth, admin } = require("../middleware/auth");

const {
  addSweet,
  getSweet,
  searchSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} = require("../controllers/sweetController");

const router = express.Router();


 // ADMIN ROUTES

router.post("/", auth, admin, addSweet);
router.put("/:id", auth, admin, updateSweet);
router.delete("/:id", auth, admin, deleteSweet);
router.post("/:id/restock", auth, admin, restockSweet);


 //USER ROUTES
 
router.get("/", auth, getSweet);
router.get("/search", auth, searchSweet);
router.post("/:id/purchase", auth, purchaseSweet);

module.exports = router;
