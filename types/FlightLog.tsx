export type FlightLog = {
    passengerName: string;
    airport: string;
    timestamp: string;
    type: "departure" | "arrival";
};