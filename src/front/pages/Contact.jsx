import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactCard } from "../components/ContactCard";
import { Modal } from "../components/Modal";
import { protect } from "../services/auth.js";


export const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const handle_whoiam = () => {
    protect()  // ejecutamos
  }

  const getContacts = async () => {
    try {
      const res = await fetch(
        "https://playground.4geeks.com/contact/agendas/contacto_familia/contacts"
      );
      const data = await res.json();

    
      const formattedContacts = data.contacts.map((c) => ({
        ...c,
        name: c.name
      }));

      setContacts(formattedContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const openDeleteModal = (id) => {
    setContactToDelete(id);
    setShowModal(true);
  };

  const deleteContact = async () => {
    try {
      await fetch(
        `https://playground.4geeks.com/contact/agendas/contacto_familia/contacts/${contactToDelete}`,
        { method: "DELETE" }
      );

      setShowModal(false);
      setContactToDelete(null);
      getContacts(); // refrescar lista
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="container mt-4">
      <span onClick={handle_whoiam} className="btn btn-primary">Who I am</span>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-light">Contact List</h1>
        <Link to="/add-contact" className="btn btn-success">
          Add new contact
        </Link>
      </div>

      {contacts.length === 0 ? (
        <p className="text-light">No contacts available.</p>
      ) : (
        contacts.map((c) => (
          <ContactCard
            key={c.id}
            contact={c}
            onDelete={() => openDeleteModal(c.id)}
          />
        ))
      )}

      <Modal
        show={showModal}
        message="¿Eliminar este contacto?"
        onConfirm={deleteContact}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};
