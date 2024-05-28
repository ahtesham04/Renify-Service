const { Property } = require("../models/property.model");

const getAllProperties = async () => {
  return Property.find();
};

const uploadProperty = async (
  owner,
  title,
  description,
  price,
  area,
  bedrooms,
  bathrooms,
  nearbyHospitals,
  nearbyColleges,
  imageUrl,
  city,
  location
) => {
  const property = new Property({
    owner,
    title,
    description,
    price,
    area,
    bedrooms,
    bathrooms,
    nearbyHospitals,
    nearbyColleges,
    imageUrl,
    city,
    location,
  });

  await property.save();
  return property;
};
const editProperty = async (
  id,
  owner,
  title,
  description,
  price,
  area,
  bedrooms,
  bathrooms,
  nearbyHospitals,
  nearbyColleges,
  imageUrl,
  city,
  location
) => {
  let property = await Property.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        title,
        description,
        price,
        area,
        bedrooms,
        bathrooms,
        nearbyHospitals,
        nearbyColleges,
        imageUrl,
        city,
        location,
      },
    },
    { new: true, useFindAndModify: false }
  );
  console.log(property);
  // const newProperty = await property.save();
  return property;
};

const removeProperty = async (id) => {
  const res = await Property.findByIdAndDelete({ _id: id });
  return res;
};

const updateLikeCount = async (id) => {
  const property = await Property.findOne({ _id: id });
  if (property === null) {
    return null;
  }
  let count = property.like + 1;
  const data = await Property.findByIdAndUpdate(
    { _id: id },
    { $set: { like: count } },
    { new: true, useFindAndModify: false }
  );
  return data;
};
module.exports = {
  getAllProperties,
  uploadProperty,
  editProperty,
  removeProperty,
  updateLikeCount,
};
