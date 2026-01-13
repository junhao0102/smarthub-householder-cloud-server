import express from "express";

import { setDeviceStatus, getTelemetry } from "../controller/device.js";

const router = express.Router();

// 獲取電表資訊
router.get("/:deviceId/telemetry", getTelemetry);

// 設定裝置開關狀態
router.post("/:deviceId/device", setDeviceStatus);

export default router;
