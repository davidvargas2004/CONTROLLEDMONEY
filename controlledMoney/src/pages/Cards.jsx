// src/pages/Cards.jsx
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/format';

const Cards = ({ creditCards, openModal, deleteItem }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tarjetas de Crédito</h1>
        <button 
          onClick={() => openModal('creditCard')}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Tarjeta</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {creditCards.map(card => {
          const usage = (card.debt / card.limit) * 100;
          return (
            <div key={card.id} className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl text-white relative">
              <button 
                onClick={() => deleteItem(card.id, 'creditCard')}
                className="absolute top-4 right-4 text-white hover:text-gray-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{card.name}</h3>
                <p className="text-sm opacity-90">Vence: {card.dueDate}</p>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm opacity-90">Deuda actual</p>
                  <p className="text-2xl font-bold">{formatCurrency(card.debt)}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Límite disponible</p>
                  <p className="text-lg font-semibold">{formatCurrency(card.limit - card.debt)}</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Uso del límite</span>
                    <span>{usage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                    <div 
                      className="h-2 bg-white rounded-full transition-all duration-300"
                      style={{ width: `${usage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;