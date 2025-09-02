import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/incidents/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Инцидент не найден");
        return res.json();
      })
      .then(setIncident)
      .catch(err => setError(err.message));
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:4000/incidents/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Ошибка при удалении");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p style={{ color: "red", fontSize: "20px" }}>{error}</p>;
  if (!incident) return <p>Загрузка...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", background: "#fff", padding: "20px", borderRadius: "10px" }}>
      <h2>{incident.type}</h2>
      <p><strong>Место:</strong> {incident.location}</p>
      <p><strong>Серьёзность:</strong> {incident.severity}</p>
      <p><strong>Статус:</strong> {incident.status}</p>
      <p><strong>Описание:</strong> {incident.description}</p>
      <p><strong>Фамилия:</strong> {incident.lastName}</p>
      <p><strong>Имя:</strong> {incident.firstName}</p>
      <p><strong>Отчество:</strong> {incident.middleName}</p>
      <p><strong>Email:</strong> {incident.email}</p>
      <p><strong>Статус человека:</strong> {incident.personStatus}</p>
      <Link to={`/edit/${id}`}>Редактировать</Link><br />
      <button onClick={handleDelete} style={{ marginTop: "10px", color: "red" }}>Удалить</button>
    </div>
  );
}