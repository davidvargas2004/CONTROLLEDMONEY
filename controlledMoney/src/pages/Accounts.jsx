// src/pages/Accounts.jsx
import React from 'react';
import { Plus, Trash2, Building2, Wallet, PiggyBank } from 'lucide-react';
import { formatCurrency } from '../utils/format';

const Accounts = ({ accounts, openModal, deleteItem }) => {

  const getAccountIcon = (type) => {
    switch (type) {
      case 'bank': return <Building2 className="w-6 h-6" />;
      case 'cash': return <Wallet className="w-6 h-6" />;
      case 'savings': return <PiggyBank className="w-6 h-6" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Cuentas</h1>
        <button 
          onClick={() => openModal('account')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Cuenta</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map(account => (
          <div key={account.id} className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getAccountIcon(account.type)}
                <div>
                  <h3 className="font-semibold text-gray-800">{account.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{account.type === 'bank' ? 'Bancaria' : account.type === 'cash' ? 'Efectivo' : 'Ahorros'}</p>
                </div>
              </div>
              <button 
                onClick={() => deleteItem(account.id, 'account')}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(account.balance)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;