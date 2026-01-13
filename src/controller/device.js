import { publishDeviceCommand } from "../mqtt/publisher/device_cmd.js";
import redis from "../services/redis/index.js";
import isoToTaipeiTime from "../utils/timeFormatter.js";

async function setDeviceStatus(req, res) {
  const { status } = req.body;
  const { deviceId } = req.params; // ESP32-e90b65f4

  try {
    if (status === "on") {
      await publishDeviceCommand(deviceId, "relay_on");
      await publishDeviceCommand(deviceId, "rf_unlock");
    } else if (status === "off") {
      await publishDeviceCommand(deviceId, "relay_off");
      await publishDeviceCommand(deviceId, "rf_lock");
    }
    return res
      .status(202)
      .json({ message: `Set device ${status} successful`, deviceId, status });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Set device ${status} failed`, error: e.message });
  }
}

async function getTelemetry(req, res) {
  const { deviceId } = req.params;
  const key = `device:${deviceId}:telemetry`;

  try {
    const telemetry = await redis.hgetall(key);

    if (Object.keys(telemetry).length === 0) {
      return res
        .status(200)
        .json({ message: "Get getTelemetry successful", telemetry: null });
    }
    telemetry.taipeiTime = isoToTaipeiTime(telemetry.timestamp);

    return res.status(200).json({
      message: "Get getTelemetry successful",
      telemetry,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Get getTelemetry failed`, error: e.message });
  }
}

// async function getRelayStatus(req, res) {
//   const { deviceId } = req.params; // ESP32-e90b65f4

//   const topic = `SmartMeter/${deviceId}/cmd`;

//   try {
//     client.publish(topic, "relay_status", { qos: 1 }, (err) => {
//       if (err) {
//         console.error(
//           `Publish deviceId(${deviceId}) cmd(relay_status) failed`,
//           err
//         );
//         return res.status(500).json({
//           message: `Publish deviceId(${deviceId}) cmd(relay_status) failed`,
//           err,
//         });
//       }
//       console.log(`Publish deviceId(${deviceId}) cmd(relay_status) successful`);
//       return res
//         .status(202)
//         .json({ message: `Get relay_status successful`, deviceId,status: });
//     });
//   } catch (e) {
//     return res
//       .status(500)
//       .json({ message: `Get relay_status failed`, error: e.message });
//   }
// }

export { setDeviceStatus, getTelemetry };
