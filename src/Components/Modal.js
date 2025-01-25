import React from 'react';

const Modal = ({ show, onClose, title, image, description }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-capitalize">{title}</h5>
          <button onClick={onClose} className="close-button">
            ×
          </button>
        </div>
        <div className="modal-body text-center">
          <img src={image} alt={title} style={{ width: '200px', height: '200px', objectFit: 'contain' }} />
          <p className="mt-3">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
