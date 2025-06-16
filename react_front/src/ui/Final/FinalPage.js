import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './styles.css';
import { useNavigate } from "react-router-dom";


const FinalPage = () =>{
    const navigate = useNavigate();
    const onClose = () =>{
        navigate(-2)

    }

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <FaCheckCircle className="success-icon" />
            <h2>Transacción exitosa</h2>
          </div>
          <div className="modal-body">
            <p>¡Tu transacción se ha completado con éxito!</p>
          </div>
          <div className="modal-footer">
            <button className="modal-close-btn" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };
  

export default FinalPage