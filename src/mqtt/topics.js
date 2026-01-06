// 對 MCU 下命令為一個 topic, 其他收資訊 topic 都是分開的
const topics = {
  cmd: (deviceId) => `SmartMeter/${deviceId}/cmd`,
  telemetry: (deviceId = "+") => `SmartMeter/${deviceId}/telemetry`,
  relay_status: (deviceId = "+") => `SmartMeter/${deviceId}/relay_status`,
};

export default topics;
