import cacheService from "../../services/cacheService.js";

export const cacheMiddleware = (duration = 300) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;

    try {
      const cachedData = await cacheService.get(key);
      if (cachedData) {
        res.json(cachedData);
        return;
      }
      const originalJSON = res.json;

      res.json = function (data) {
        cacheService.set(key, data, duration);
        console.log("Cache set for:", key);

        return originalJSON.call(this, data);
      };

      next();
    } catch (error) {
      console.error("Cache middleware error:", error);
      next();
    }
  };
};

export const wishlistCacheMiddleware = cacheMiddleware(600);
export const cartCacheMiddleware = cacheMiddleware(300);
export const addressCacheMiddleware = cacheMiddleware(600);
export const profileCacheMiddleware = cacheMiddleware(600);
export const productCacheMiddleware = cacheMiddleware(600);
export const userCacheMiddleware = cacheMiddleware(300);
