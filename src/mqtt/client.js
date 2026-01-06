import mqtt from "mqtt";
import config from "../config/mqtt.js";

const client = mqtt.connect(config.url, config.options);

client.on("connect", () => {
  console.log("MQTT connected");
});

client.on("error", (err) => {
  console.error("MQTT error", err);
});

client.on("close", () => {
  console.warn("MQTT disconnected");
});

export default client;
