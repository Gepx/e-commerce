import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  socket: {
    reconnectStrategy(retries) {
      if (retries > 10) {
        console.log("Max connection attempts reached");
        return new Error("Max connection attempts reached");
      }
      return Math.min(retries * 100, 3000);
    },
  },
});

client.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("ready", () => {
  console.log("Redis Client is Ready.");
});

client.on("end", () => {
  console.log("Redis connection Ended.");
});

const connectRedis = async () => {
  try {
    console.log(client);
    if (!client.isOpen) {
      await client.connect();
    }
  } catch (error) {
    console.error("Redis Connection Error:", error);
  }
};

export default client;
export { connectRedis };
