export type FlightLog = {
    passengerName: string;
    airport: string;
    timestamp: number;
    type: "departure" | "arrival";
};