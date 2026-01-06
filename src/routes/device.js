import express from "express";

import { setRelayStatus,setRfStatus } from "../controller/device.js";

const router = express.Router();

// router.get("/:deviceId/relay", relayStatus);

// 設定裝置開關狀態
router.post("/:deviceId/relay", setRelayStatus);

router.post("/:deviceId/rf",setRfStatus)

export default router;
