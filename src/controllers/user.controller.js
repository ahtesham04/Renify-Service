const httpStatus = require("http-status");
const { getUserById } = require("../services/user.service");
const ApiError = require("../utils/ApiError");
const sendEmail = require("../services/email.service");
const { Property } = require("../models/property.model");

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    // throw new ApiError(
    //   httpStatus.INTERNAL_SERVER_ERROR,
    //   "Server is not running"
    // );
    console.log(error);
  }
};
const getSellerInfo = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("user");
    if (!property) return res.status(404).json({ msg: "Property not found" });

    const seller = await getUserById(req.params.id);
    res.status(httpStatus.ok).json(seller);

    // Send email to both buyer and seller
    const buyer = await getUserById(req.user);

    // Email content
    const sellerEmailContent = `Hello ${seller.name},\n\n${buyer.name} is interested in your property "${property.title}". You can contact them at ${buyer.email}.`;
    const buyerEmailContent = `Hello ${buyer.name},\n\nYou have shown interest in the property "${property.title}". The seller is ${seller.name} and can be reached at ${seller.email}.`;

    // Send emails
    sendEmail(
      seller.email,
      "New Interest in Your Property",
      sellerEmailContent
    );
    sendEmail(
      buyer.email,
      "You Have Shown Interest in a Property",
      buyerEmailContent
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
};
module.exports = { getUser };
