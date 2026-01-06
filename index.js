import app from "./src/server/http_server.js";
import { subscribeTelemetry } from "./src/mqtt/subscriber/telemetry.js";

// 初始化 http server
(async () => {
  try {
    subscribeTelemetry();
    app.listen(5051, () => {
      console.log("HTTP server is listening on http://localhost:5051");
    });
  } catch (e) {
    console.error(`Start server error: ${e.message}`);
  }
})();
