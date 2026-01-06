import client from "../client.js";
import topics from "../topics.js";
import redis from "../../services/redis/index.js"

function subscribeRelayStatus() {
  client.subscribe(topics.relay_status(), (err) => {
    if (err) {
      console.error("Subscribe relay_status failed", err);
    } else {
      console.log("Subscribed relay_status");
    }
  });

  client.on("message", (topic, payload) => {
    if (!topic.startsWith("SmartMeter/") || !topic.endsWith("/relay_status")) {
      return;
    }
    console.log(topic);
    console.log(payload);
  });
}

export { subscribeRelayStatus };
