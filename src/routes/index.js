import express from "express";

import device from "./device.js";

const router = express.Router();

router.use("/device", device);

export default router;
