
import { useState } from "react";

function AdminRegisterComp() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/auth/register/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then((resp) => resp.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error(error);
        alert("Registration failed");
      });
  };

  return (
    <div className="register-container">
      <h2>Admin Registration</h2>

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Register Admin
        </button>
      </form>
    </div>
  );
}

export default AdminRegisterComp;
