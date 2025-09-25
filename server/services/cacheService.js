import client, { CACHE_ENABLED } from "../config/redis.js";

class CacheService {
  isReady() {
    return CACHE_ENABLED && client?.isOpen;
  }
  async set(key, value, expiration = 3600) {
    try {
      if (!this.isReady()) return false;
      const serialized = JSON.stringify(value);
      await client.setEx(key, expiration, serialized);
      return true;
    } catch (error) {
      console.error("Cache set error:", error);
      return false;
    }
  }

  async get(key) {
    try {
      if (!this.isReady()) return null;
      const cached = await client.get(key);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error("Cache get error:", error);
      return null;
    }
  }

  async delete(key) {
    try {
      if (!this.isReady()) return false;
      await client.del(key);
      return true;
    } catch (error) {
      console.error("Cache delete error:", error);
      return false;
    }
  }

  async delMany(keys) {
    try {
      if (!this.isReady()) return false;
      if (keys.length > 0) {
        await client.del(keys);
      }
      return true;
    } catch (error) {
      console.error("Cache delete many error:", error);
      return false;
    }
  }

  async clearPattern(pattern) {
    try {
      if (!this.isReady()) return false;
      const keys = await client.keys(pattern);
      if (keys.length > 0) {
        await client.del(keys);
      }
      return true;
    } catch (error) {
      console.error("Cache clear pattern error:", error);
      return false;
    }
  }
  async exists(key) {
    try {
      if (!this.isReady()) return false;
      const result = await client.exists(key);
      return result === 1;
    } catch (error) {
      console.error("Cache exists error:", error);
      return false;
    }
  }
  async expire(key, seconds) {
    try {
      if (!this.isReady()) return false;
      await client.expire(key, seconds);
      return true;
    } catch (error) {
      console.error("Cache expire error:", error);
      return false;
    }
  }
}

export default new CacheService();
