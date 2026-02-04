import { FlightLog } from "@/types/FlightLog";
function LogItem({ item }: { item: FlightLog }) {
  const date = new Date(item.timestamp * 1000);
  const formatDate = date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return (
    <div style={{ display: "flex" }}>
      <style>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
      <span style={{ flex: 1 }}>{item.passengerName}</span>
      <span style={{ flex: 1 }}>{item.airport}</span>
      <span style={{ flex: 1, marginRight: 10 }}>
        <span style={{ marginRight: 10 }}>{formatDate}</span>
        <span style={{ animation: "blink 2s steps(1,end) infinite" }}>
          {hours}:{minutes}:{seconds}
        </span>
      </span>
      <span style={{ flex: 1, color: item.type === "departure" ? "#f94946" : "#14b31c", }}>
        {item.type === "departure" ? "Departure" : "Arrival"}
      </span>
    </div >
  );
}

export default LogItem;
