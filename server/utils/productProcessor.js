const streamUpload = require("../config/cloudinary");

const parseData = async (body, files) => {
  const data = { ...body };

  const fieldsToParse = [
    "productSpecification",
    "variants",
    "variations",
    "productCategory",
    "reviews",
    "existingImages",
  ];

  for (const field of fieldsToParse) {
    if (data[field]) {
      if (Array.isArray(data[field])) {
        data[field] = data[field].flatMap((val) => {
          try {
            return JSON.parse(val);
          } catch {
            return [];
          }
        });
      } else if (typeof data[field] === "string") {
        try {
          data[field] = JSON.parse(data[field]);
        } catch {}
      }
    }
  }

  if (data.productPrice !== undefined) {
    data.productPrice = Number(data.productPrice);
  }
  if (data.stock !== undefined) {
    data.stock = Number(data.stock);
  }

  const existingImages = Array.isArray(data.existingImages)
    ? data.existingImages
    : [];
  let newImageUrls = [];

  if (files && files.length > 0) {
    const uploadResults = await Promise.all(
      files.map((file) => streamUpload(file.buffer))
    );
    newImageUrls = uploadResults.map((res) => res.secure_url);
  }

  data.productImages = [...existingImages, ...newImageUrls];
  delete data.existingImages;

  if (Array.isArray(data.variations) && data.variations.length > 0) {
    data.stock = data.variations.reduce(
      (sum, v) => sum + (Number(v?.stock) || 0),
      0
    );

    const prices = data.variations
      .map((v) => Number(v?.price))
      .filter((p) => !isNaN(p) && p > 0);

    if (prices.length > 0) {
      data.productPrice = Math.min(...prices);
    }
  }

  return data;
};

module.exports = parseData;
