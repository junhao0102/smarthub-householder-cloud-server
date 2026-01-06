import mqtt from "mqtt";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const options = {
  port: Number(process.env.MQTT_PORT),
  clientId: process.env.MQTT_CLIENT_ID,
  connectTimeout: 10000,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

const client = mqtt.connect(process.env.MQTT_URL, options);

// client.on("connect", () => {
//   client.subscribe("SmartMeter/ESP32-e90b65f4/telemetry", (error) => {
//     if (error) {
//       console.error("訂閱失敗");
//     }
//     console.log("已訂閱 SmartMeter/ESP32-e90b65f4/telemetry !");
//   });
// });

client.on("connect", () => {
  client.subscribe("SmartMeter/ESP32-e90b65f4/relay_status", (error) => {
    if (error) {
      console.error("訂閱失敗");
    }
    console.log("已訂閱 SmartMeter/ESP32-e90b65f4/relay_status !");
  });
});

client.on("message", (topic, message) => {
  console.log(topic, message.toString());
});
