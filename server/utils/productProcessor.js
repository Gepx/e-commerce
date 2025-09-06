import streamUpload from "../config/cloudinary.js";

export const uploadNewImages = async (files) => {
  if (!files || files.length === 0) {
    return [];
  }
  const uploadResults = await Promise.all(
    files.map((file) => streamUpload(file.buffer))
  );
  return uploadResults.map((res) => res.secure_url);
};

export const parseBodyFields = async (body) => {
  const data = { ...body };

  const fieldsToParse = [
    "productSpecification",
    "variants",
    "variations",
    "productCategory",
    "reviews",
    "removedImages",
  ];

  for (const field of fieldsToParse) {
    if (data[field] && typeof data[field] === "string") {
      try {
        data[field] = JSON.parse(data[field]);
      } catch {}
    }
  }

  if (data.productPrice !== undefined) {
    data.productPrice = Number(data.productPrice);
  }
  if (data.stock !== undefined) {
    data.stock = Number(data.stock);
  }

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
