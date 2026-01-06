import { publishDeviceCommand } from "../mqtt/publisher/device_cmd.js";

async function setRelayStatus(req, res) {
  const { cmd } = req.body;
  const { deviceId } = req.params; // ESP32-e90b65f4

  if (!["relay_on", "relay_off"].includes(cmd)) {
    return res.status(400).json({ message: "Invalid cmd" });
  }

  try {
    await publishDeviceCommand(deviceId, cmd);
    return res
      .status(202)
      .json({ message: `Set ${cmd} successful`, deviceId, cmd });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Set ${cmd} failed`, error: e.message });
  }
}

async function setRfStatus(req, res) {
  const { cmd } = req.body;
  const { deviceId } = req.params; // ESP32-e90b65f4

  if (!["rf_lock", "rf_unlock"].includes(cmd)) {
    return res.status(400).json({ message: "Invalid cmd" });
  }

  try {
    await publishDeviceCommand(deviceId, cmd);
    return res
      .status(202)
      .json({ message: `${deviceId} ${cmd} successful`, deviceId, cmd });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `${deviceId} ${cmd} failed`, error: e.message });
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

export { setRelayStatus, setRfStatus };
