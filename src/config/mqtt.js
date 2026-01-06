import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

export default {
  url: process.env.MQTT_URL,
  options: {
    port: Number(process.env.MQTT_PORT),
    clientId: process.env.MQTT_CLIENT_ID,
    connectTimeout: 10000,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    reconnectPeriod: 0,
  },
};
