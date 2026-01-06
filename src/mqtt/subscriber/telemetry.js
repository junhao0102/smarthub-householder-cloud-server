import client from "../client.js";
import topics from "../topics.js";
import redis from "../../services/redis/index.js";

function subscribeTelemetry() {
  client.subscribe(topics.telemetry(), (err) => {
    if (err) {
      console.error("Subscribe telemetry failed", err);
    } else {
      console.log("Subscribed telemetry");
    }
  });

  client.on("message", async (topic, payload) => {
    if (!topic.startsWith("SmartMeter/") || !topic.endsWith("/telemetry")) {
      return;
    }
    const [, deviceId] = topic.split("/");
    const key = `device:${deviceId}:telemetry`;
    const telemetry = JSON.parse(payload.toString("utf8"));

    try {
      await redis.hset(key, {
        voltage: telemetry.voltage,
        currentA: telemetry.currentA,
        currentB: telemetry.currentB,
        powerA: telemetry.powerA,
        powerB: telemetry.powerB,
        timestamp: new Date().toISOString(),
      });
      await redis.expire(key, 30);
    } catch (e) {
      console.error("[Redis] write telemetry failed", e.message);
    }
  });
}

export { subscribeTelemetry };
