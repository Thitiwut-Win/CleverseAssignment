import { FlightLog } from "@/types/FlightLog";
function LogItem({ item }: { item: FlightLog }) {
  const formatTime = new Date(item.timestamp * 1000).toLocaleString();
  return (
    <div style={{ display: "flex" }}>
      <span style={{ flex: 1 }}>{item.passengerName}</span>
      <span style={{ flex: 1 }}>{item.airport}</span>
      <span style={{ flex: 1, marginRight: 10 }}>{formatTime}</span>
      <span style={{ flex: 1, color: item.type === "departure" ? "#f94946" : "#14b31c", }}>
        {item.type === "departure" ? "Departure" : "Arrival"}
      </span>
    </div>
  );
}

export default LogItem;
