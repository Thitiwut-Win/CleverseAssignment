import { FlightLog } from "@/types/FlightLog";
import React, { useState, useCallback, CSSProperties } from "react";

const emptyForm = {
  passengerName: "",
  airport: "",
  timestamp: "",
};

function LogForm({ style, type, onSubmit }: { style?: CSSProperties, type: "departure" | "arrival", onSubmit: Function }) {

  const [formData, setFormData] = useState(emptyForm);

  const handleSubmit = useCallback(() => {
    const timestampNumber = Math.floor(
      new Date(formData.timestamp).getTime() / 1000
    );
    onSubmit({
      passengerName: formData.passengerName,
      airport: formData.airport,
      timestamp: timestampNumber,
      type,
    });
    setFormData(emptyForm);
  }, [formData, type, onSubmit]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  return (
    <form style={{ display: "flex", columnGap: 8, ...style }}>
      {[
        { id: "passengerName", label: "Passenger Name", type: "text" },
        { id: "airport", label: "Airport", type: "text" },
        { id: "timestamp", label: "Date & Time", type: "datetime-local" },
      ].map((field) => (
        <div
          key={field.id}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <label
            htmlFor={field.id}
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: "#cbd5f5",
            }}
          >
            {field.label.toUpperCase()}
          </label>

          <input
            id={field.id}
            type={field.type}
            value={(formData as any)[field.id]}
            onChange={handleChange}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "#434c769a",
              color: "#e5e7eb",
              fontFamily: "inherit",
              outline: "none",
              marginRight: "1rem"
            }}
          />
        </div>
      ))}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
        <button type="submit" onClick={(e) => { e.preventDefault(); handleSubmit(); }}
          style={{
            padding: "10px 20px",
            borderRadius: 999,
            border: "none",
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: "white",
            cursor: "pointer",
            background: `linear-gradient(135deg, #3b82f6)`,
            boxShadow: `0 8px 20px 55`,
            transition: "transform 0.15s ease",
          }}
        >Submit</button>
      </div>
    </form>
  );
}

export default LogForm;
