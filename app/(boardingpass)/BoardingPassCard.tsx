import { CSSProperties } from "react";

type BoardingPassCardProps = {
  passengerName: string;
  from: string;
  to: string;
  departureTime: number;
  arrivalTime: number;
  style?: CSSProperties;
};

function BoardingPassCard({ passengerName, from, to, departureTime, arrivalTime, style }: BoardingPassCardProps) {
  const dTime = new Date(departureTime * 1000).toLocaleString();
  const aTime = new Date(arrivalTime * 1000).toLocaleString();
  return (
    <div
      style={{
        border: "3px solid rgba(255,255,255,0.25)",
        background: "linear-gradient(135deg, #020617, #0f172a)",
        color: "#e5e7eb",
        boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
        borderRadius: 20,
        padding: 16,
        maxWidth: 420,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          marginBottom: 12,
        }}
      >
        <strong style={{ fontSize: 18 }}>BOARDING PASS</strong>
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Passenger</div>
        <div style={{ fontSize: 18 }}>{passengerName}</div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>From</div>
          <div style={{ fontSize: 16 }}>{from}</div>
        </div>

        <div style={{ fontSize: 20, alignSelf: "flex-end" }}>→</div>

        <div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>To</div>
          <div style={{ fontSize: 16 }}>{to}</div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 14,
        }}
      >
        <div>
          <div style={{ opacity: 0.7 }}>Departure</div>
          <div>{dTime}</div>
        </div>

        <div>
          <div style={{ opacity: 0.7 }}>Arrival</div>
          <div>{aTime}</div>
        </div>
      </div>
    </div>
  );
}

export default BoardingPassCard;
