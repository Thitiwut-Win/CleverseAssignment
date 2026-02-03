import { FlightLog } from "@/types/FlightLog";
import React, { useState, useCallback, CSSProperties } from "react";

const emptyForm = {
  passengerName: "",
  airport: "",
  timestamp: "",
};

function LogForm({ style, data, type, onSubmit }: { style?: CSSProperties, data: FlightLog[], type: "departure" | "arrival", onSubmit: Function }) {

  const [formData, setFormData] = useState(emptyForm);

  const handleSubmit = useCallback(() => {
    onSubmit({ ...formData, type });
    setFormData(emptyForm);
  }, [formData, type, onSubmit]);

  const handleChange = useCallback((target: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = target.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  return (
    <div style={{ display: "flex", columnGap: 8, ...style }}>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="passengerName" style={{ fontWeight: "bold" }}>
          Passenger Name:
        </label>
        <input
          type="text"
          id="passengerName"
          name="passengerName"
          value={formData.passengerName}
          onChange={handleChange}
        />
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="airport" style={{ fontWeight: "bold" }}>
          Airport:
        </label>
        <input
          type="text"
          id="airport"
          name="airport"
          value={formData.airport}
          onChange={handleChange}
        />
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="timestamp" style={{ fontWeight: "bold" }}>
          Timestamp:
        </label>
        <input
          type="text"
          id="timestamp"
          name="timestamp"
          value={formData.timestamp}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default LogForm;
