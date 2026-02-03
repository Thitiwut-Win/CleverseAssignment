import { FlightLog } from "@/types/FlightLog";

export class FlightLogService {
  initialData: FlightLog[] = [
    {
      passengerName: "cherprang",
      airport: "bangkok",
      timestamp: 1630454400,
      type: "departure",
    },
    {
      passengerName: "sita",
      airport: "chiangmai",
      timestamp: 1630627200,
      type: "departure",
    },
    {
      passengerName: "cherprang",
      airport: "tokyo",
      timestamp: 1630454405,
      type: "arrival",
    },
  ];

  getLogs() {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(this.initialData || []);
      }, 2000);
    });
  }
}
