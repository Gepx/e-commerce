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

export const simpleCacheMiddleware = cacheMiddleware(300);
