const streamUpload = require("../config/cloudinary");

const parseData = async (data, files) => {
  const fieldToParse = [
    "productSpecification",
    "variants",
    "variations",
    "productCategory",
    "reviews",
  ];

  for (const field of fieldToParse) {
    if (data[field] && typeof data[field] === "string") {
      try {
        data[field] = JSON.parse(data[field]);
      } catch (error) {
        console.error(`Failed to parse JSON for field: ${field}`, error);
      }
    }
  }

  if (Array.isArray(data.variations) && data.variations.length > 0) {
    const totalStock = data.variations.reduce(
      (sum, v) => sum + (Number(v?.stock) || 0),
      0
    );
    const prices = data.variations
      .map((v) => Number(v?.price))
      .filter((p) => !isNaN(p) && p > 0);

    data.stock = totalStock;

    if (prices.length) {
      const minVariationPrice = Math.min(...prices);
      data.productPrice = Math.min(
        Number(data.productPrice) || Infinity,
        minVariationPrice
      );
    }
  }

  if (files && files.length > 0) {
    const uploadResults = await Promise.all(
      files.map((file) => streamUpload(file.buffer))
    );
    const existingImages = Array.isArray(data.productImages)
      ? data.productImages
      : [];
    data.productImages = [
      ...existingImages,
      ...uploadResults.map((res) => res.secure_url),
    ];
  }

  return data;
};

module.exports = parseData;
