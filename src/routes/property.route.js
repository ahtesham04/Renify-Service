const express = require("express");
const {
  getProperties,
  addNewProperty,
  updateProperty,
  deleteProperty,
  increaseCount,
} = require("../controllers/property.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", getProperties);
router.post("/new", auth, addNewProperty);
router.put("/:id", auth, updateProperty);
router.delete("/:id", auth, deleteProperty);
router.put("/:id/likes", increaseCount);

// Delete a property
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     let property = await Property.findById(req.params.id);
//     if (!property) return res.status(404).json({ msg: "Property not found" });

//     if (property.user.toString() !== req.user.id)
//       return res.status(401).json({ msg: "User not authorized" });

//     await Property.findByIdAndRemove(req.params.id);

//     res.json({ msg: "Property removed" });
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
// });

module.exports = router;
