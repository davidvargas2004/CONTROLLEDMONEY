// src/components/ui/Modal.jsx
import React from 'react';
import { X } from 'lucide-react';

// Este componente no sabe nada de finanzas. Solo muestra contenido.
// Recibe `title`, `children` (el contenido) y `onClose` como props.
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default Modal;