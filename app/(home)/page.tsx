"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Home.module.css";
import { FlightLogService } from "../(flightlog)/fightlog.service";
import LogCard from "../(flightlog)/LogCard";
import LogForm from "../(flightlog)/LogForm";
import { FlightLog } from "@/types/FlightLog";
import BoardingPassCard from "../(boardingpass)/BoardingPassCard";

const flightLogService = new FlightLogService();

type AverageRecord = Record<
  string,
  { totalTime: number; count: number }
>;

export default function Home() {
  const [logs, setLogs] = useState<FlightLog[]>([]);
  const [averageRecord, setAverageRecord] = useState<AverageRecord>({});
  const [activeDepartures, setActiveDepartures] = useState<Record<string, { time: number; from: string }>>({});

  const handleAddLog = (log: FlightLog) => {
    if (!log.passengerName || !log.airport || !log.timestamp) return;

    if (log.type === "arrival" && !activeDepartures[log.passengerName]) return;

    if (log.type === "arrival" && log.timestamp < activeDepartures[log.passengerName].time) return;

    if (log.type === "arrival" && log.airport === activeDepartures[log.passengerName].from) return;

    if (log.type === "departure") {
      setActiveDepartures(prev => ({
        ...prev,
        [log.passengerName]: {
          time: log.timestamp,
          from: log.airport,
        }
      }));
      setLogs(prev => [...prev, log]);
      return;
    }

    if (log.type === "arrival") {
      setActiveDepartures(prevDepartures => {
        const departure = prevDepartures[log.passengerName];

        const duration = log.timestamp - departure.time;
        setLogs(prev => [...prev, log]);

        setAverageRecord(prevAvg => {
          const current = prevAvg[log.passengerName] ?? {
            totalTime: 0,
            count: 0,
          };

          return {
            ...prevAvg,
            [log.passengerName]: {
              totalTime: current.totalTime + duration,
              count: current.count + 1,
            },
          };
        });

        const { [log.passengerName]: _, ...rest } = prevDepartures;
        return rest;
      });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await flightLogService.getLogs();
      setLogs(data);

      const avg: AverageRecord = {};
      const departures: Record<string, { time: number; from: string }> = {};

      for (const log of data) {
        if (log.type === "departure") {
          departures[log.passengerName].time = log.timestamp;
          departures[log.passengerName].from = log.airport;
        }

        if (log.type === "arrival") {
          const dep = departures[log.passengerName];
          if (!dep) continue;

          const duration = log.timestamp - dep.time;

          const current = avg[log.passengerName] ?? {
            totalTime: 0,
            count: 0,
          };

          current.totalTime += duration;
          current.count += 1;
          avg[log.passengerName] = current;

          delete departures[log.passengerName];
        }
      }

      setAverageRecord(avg);
      setActiveDepartures(departures);
    };

    fetch();
  }, []);

  useEffect(() => {

  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next Airline!</a>
        </h1>
        {/*
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>app/(home)/page.tsx</code>
        </p>
        */}
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Flight Logs</h2>
          <LogCard style={{ width: "100%" }} data={logs}></LogCard>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Departure Logging</h2>
          <LogForm
            style={{ width: "100%" }}
            type={"departure"}
            onSubmit={handleAddLog}
          ></LogForm>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Arrival Logging</h2>
          <LogForm
            style={{ width: "100%" }}
            type={"arrival"}
            onSubmit={handleAddLog}
          ></LogForm>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Average Time Per Passenger</h2>

          {Object.entries(averageRecord).map(([name, stat]) => {
            const avg = stat.totalTime / stat.count;

            return (
              <div
                key={name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ alignContent: "center" }}>
                  {name}: {avg}
                </span>

                <button
                  onClick={() =>
                    console.log(`Average time for ${name}:`, avg)
                  }
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
                    marginTop: "10px"
                  }}
                >
                  Print
                </button>
              </div>
            );
          })}
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Boarding Passes</h2>

          {logs.map((log, index) => {
            if (log.type !== "arrival") return null;

            const departure = logs
              .slice(0, index)
              .findLast(
                l =>
                  l.passengerName === log.passengerName &&
                  l.type === "departure"
              );

            if (!departure) return null;

            return (
              <BoardingPassCard
                key={`${log.passengerName}-${log.timestamp}`}
                passengerName={log.passengerName}
                from={departure.airport}
                to={log.airport}
                departureTime={departure.timestamp}
                arrivalTime={log.timestamp}
                style={{ marginBottom: 16 }}
              />
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
