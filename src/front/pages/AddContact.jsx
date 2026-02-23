import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export const AddContact = () => {

  const { id } = useParams(); // si existe es edición
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  // Cargar contacto existente si estamos editando
  const loadContact = async () => {
    try {
      const res = await fetch(
        `https://playground.4geeks.com/contact/agendas/contacto_familia/contacts/${id}`
      );
      const data = await res.json();
      setForm(data);
    } catch (error) {
      console.error("Error loading contact:", error);
    }
  };

  useEffect(() => {
    if (id) loadContact();
  }, [id]);

  // Manejo de cambios del form
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  // Guardar contacto
  const handleSubmit = async (event) => {
  event.preventDefault();

  const method = id ? "PUT" : "POST";
  const url = id
    ? `https://playground.4geeks.com/contact/agendas/contacto_familia/contacts/${id}`
    : `https://playground.4geeks.com/contact/agendas/contacto_familia/contacts`;

  const bodyToSend = id
    ? form // PUT NO necesita agenda_slug
    : { ...form, name: form.name, agenda_slug: "contacto_familia"}; // POST SÍ

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyToSend)
  });

  navigate("/contact");
};


  return (
    <div className="container mt-4">

      <h1 className="mb-4">{id ? "Edit contact" : "Add new contact"}</h1>

      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary w-100 mb-3" type="submit">
          Save
        </button>

        <Link to="/contact" className="btn btn-secondary w-100">
          Back to contacts
        </Link>
      </form>
    </div>
  );
};
