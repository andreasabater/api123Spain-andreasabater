import React from "react";

export const Modal = ({ show, onConfirm, onCancel, message }) => {
  return (
    <div className={`modal ${show ? "d-block show" : "d-none"}`} style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          
          <div className="modal-header">
            <h5 className="modal-title">Confirmar acción</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>

          <div className="modal-body">
            <p>{message}</p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              Eliminar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
