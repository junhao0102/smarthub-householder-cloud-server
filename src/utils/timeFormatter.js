// 將 ISO 字串轉為台北時間
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

function isoToTaipeiTime(isoString) {
  return dayjs.utc(isoString).tz("Asia/Taipei").format("YYYY-MM-DDTHH:mm:ssZ");
}

export default isoToTaipeiTime;
