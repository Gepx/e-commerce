const SEARCH_FIELDS = {
  product: ["productName", "productDescription"],
  user: ["username", "firstName", "lastName", "email"],
};

const SPECIAL_FILTERS = {
  product: (params) => {
    const conditions = {};
    if (params.minPrice || params.maxPrice) {
      conditions.productPrice = {};
      if (params.minPrice !== undefined) {
        conditions.productPrice.$gte = Number(params.minPrice);
      }
      if (params.maxPrice !== undefined) {
        conditions.productPrice.$lte = Number(params.maxPrice);
      }
    }
    return conditions;
  },
  user: () => ({}),
};

function createQueryParams(searchParams, type = "generic") {
  const conditions = {};

  if (searchParams.search && SEARCH_FIELDS[type]) {
    conditions.$or = SEARCH_FIELDS[type].map((field) => ({
      [field]: { $regex: searchParams.search, $options: "i" },
    }));
  }

  if (SPECIAL_FILTERS[type]) {
    Object.assign(conditions, SPECIAL_FILTERS[type](searchParams));
  }

  Object.keys(searchParams).forEach((key) => {
    if (["search", "minPrice", "maxPrice", "page", "limit"].includes(key))
      return;

    const value = searchParams[key];
    if (value !== null && value !== undefined) {
      if (typeof value === "string") {
        conditions[key] = { $regex: value, $options: "i" };
      } else {
        conditions[key] = value;
      }
    }
  });

  return conditions;
}

module.exports = createQueryParams;
