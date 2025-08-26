import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://effective-giggle-g47x4x7579jjhwxgq-5173.app.github.dev/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Login incorrecto");
        return res.json();
      })
      .then((data) => {
        login(data.token); // Guardamos el token en contexto + localStorage
        navigate("/dashboard"); // Redirige al dashboard
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Iniciar sesión</h2>
      {error && <p className="text-danger">{error}</p>}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
