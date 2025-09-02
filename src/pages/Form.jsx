import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Form() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    type: "",
    location: "",
    severity: "",
    status: "",
    description: "",
    lastName: "",
    firstName: "",
    middleName: "",
    email: "",
    personStatus: ""
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/incidents/${id}`)
        .then(res => res.json())
        .then(resData => setData(resData))
        .catch(console.error);
    }
  }, [id]);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id ? `http://localhost:4000/incidents/${id}` : "http://localhost:4000/incidents";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(() => navigate("/"))
      .catch(console.error);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", background: "#fff", padding: "20px", borderRadius: "10px" }}>
      <h2>{id ? "Редактировать инцидент" : "Добавить инцидент"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <label>Тип:<input name="type" value={data.type} onChange={handleChange} /></label>
        <label>Место:<input name="location" value={data.location} onChange={handleChange} /></label>
        <label>Серьёзность:
          <select name="severity" value={data.severity} onChange={handleChange}>
            <option value="">Выберите</option>
            <option value="Низкая">Низкая</option>
            <option value="Средняя">Средняя</option>
            <option value="Высокая">Высокая</option>
            <option value="Критическая">Критическая</option>
            <option value="Опасно для жизни">Опасно для жизни</option>
          </select>
        </label>
        <label>Статус:
          <select name="status" value={data.status} onChange={handleChange}>
            <option value="">Выберите</option>
            <option value="В процессе">В процессе</option>
            <option value="Решен">Решен</option>
          </select>
        </label>
        <label>Описание:<textarea name="description" value={data.description} onChange={handleChange}></textarea></label>
        <label>Фамилия:<input name="lastName" value={data.lastName} onChange={handleChange} /></label>
        <label>Имя:<input name="firstName" value={data.firstName} onChange={handleChange} /></label>
        <label>Отчество:<input name="middleName" value={data.middleName} onChange={handleChange} /></label>
        <label>Email:<input name="email" value={data.email} onChange={handleChange} /></label>
        <label>Статус человека:
          <select name="personStatus" value={data.personStatus} onChange={handleChange}>
            <option value="">Выберите</option>
            <option value="Прохожий">Прохожий</option>
            <option value="Сотрудник">Сотрудник</option>
            <option value="Другой">Другой</option>
          </select>
        </label>
        <div style={{ gridColumn: "1 / -1" }}>
          <button type="submit">Сохранить</button>
        </div>
      </form>
    </div>
  );
}