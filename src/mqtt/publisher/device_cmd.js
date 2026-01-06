import client from "../client.js";
import topics from "../topics.js";

function publishDeviceCommand(deviceId, cmd) {
  return new Promise((resolve, reject) => {
    client.publish(topics.cmd(deviceId), cmd, { qos: 1 }, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export { publishDeviceCommand };
