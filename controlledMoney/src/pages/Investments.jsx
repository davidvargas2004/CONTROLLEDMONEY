// src/pages/Payments.jsx
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/format';

const Payments = ({ scheduledPayments, accounts, openModal, deleteItem }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Pagos Programados</h1>
        <button 
          onClick={() => openModal('payment')}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Pago</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scheduledPayments.map(payment => (
          <div key={payment.id} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">{payment.name}</h3>
                <p className="text-sm text-gray-600">{payment.recurring ? 'Recurrente' : 'Único'}</p>
              </div>
              <button 
                onClick={() => deleteItem(payment.id, 'payment')}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold text-gray-800">{formatCurrency(payment.amount)}</p>
              <p className="text-sm text-gray-600">Vence: {payment.dueDate}</p>
              <p className="text-sm text-gray-600">
                Cuenta: {accounts.find(acc => acc.id === payment.account)?.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;