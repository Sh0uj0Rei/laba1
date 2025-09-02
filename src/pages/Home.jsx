import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/incidents")
      .then(res => {
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        return res.json();
      })
      .then(data => setIncidents(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = id => {
    if (!window.confirm("Удалить этот инцидент?")) return;
    fetch(`http://localhost:4000/incidents/${id}`, { method: "DELETE" })
      .then(() => setIncidents(prev => prev.filter(i => i.id !== id)))
      .catch(console.error);
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Загрузка...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center", marginTop: "50px" }}>{error}</p>;

  return (
    <div style={{
      maxWidth: "1000px",
      margin: "30px auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Список инцидентов</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>ID</th>
            <th>Тип</th>
            <th>Место</th>
            <th>Серьёзность</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((item, idx) => (
            <tr key={item.id} style={{ background: idx % 2 === 0 ? "#fafafa" : "#fff" }}>
              <td>{item.id}</td>
              <td>{item.type}</td>
              <td>{item.location}</td>
              <td>{item.severity}</td>
              <td>{item.status}</td>
              <td>
                <Link to={`/detail/${item.id}`} style={{ marginRight: "8px" }}>Подробнее</Link>
                <Link to={`/edit/${item.id}`} style={{ marginRight: "8px" }}>Редактировать</Link>
                <button onClick={() => handleDelete(item.id)} style={{ color: "red" }}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/add">➕ Добавить инцидент</Link>
      </div>
    </div>
  );
}