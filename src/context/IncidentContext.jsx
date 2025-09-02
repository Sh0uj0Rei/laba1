import { createContext, useState, useEffect } from "react";

export const IncidentContext = createContext();

export function IncidentProvider({ children }) {
  const [incidents, setIncidents] = useState([]);

  // загружаем данные при старте
  useEffect(() => {
    fetch("http://localhost:4000/incidents")
      .then(res => res.json())
      .then(data => setIncidents(data));
  }, []);

  return (
    <IncidentContext.Provider value={{ incidents, setIncidents }}>
      {children}
    </IncidentContext.Provider>
  );
}