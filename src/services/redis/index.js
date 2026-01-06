import Redis from "ioredis";
import config from "../../config/redis.js";

const redis = new Redis({
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
});

redis.on("connect", () => {
  console.log("Redis connected!");
});

redis.on("error", (err) => {
  console.error("Redis error", err);
});

export default redis;
