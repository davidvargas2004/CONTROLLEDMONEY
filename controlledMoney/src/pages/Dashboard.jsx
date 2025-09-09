// src/pages/Dashboard.jsx
import React from 'react';
import { Building2, Wallet, PiggyBank } from 'lucide-react';
import { formatCurrency } from '../utils/format';

const Dashboard = ({ accounts, transactions, creditCards, getTotalBalance, getTotalIncome, getTotalExpenses, getTotalDebt }) => {

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
      {/* Cards de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <h3 className="text-sm font-medium opacity-90">Balance Total</h3>
          <p className="text-2xl font-bold">{formatCurrency(getTotalBalance())}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <h3 className="text-sm font-medium opacity-90">Ingresos</h3>
          <p className="text-2xl font-bold">{formatCurrency(getTotalIncome())}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl text-white">
          <h3 className="text-sm font-medium opacity-90">Gastos</h3>
          <p className="text-2xl font-bold">{formatCurrency(getTotalExpenses())}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <h3 className="text-sm font-medium opacity-90">Deudas</h3>
          <p className="text-2xl font-bold">{formatCurrency(getTotalDebt())}</p>
        </div>
      </div>

      {/* Cuentas */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Mis Cuentas</h2>
        <div className="space-y-3">
          {accounts.map(account => (
            <div key={account.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getAccountIcon(account.type)}
                <span className="font-medium text-gray-700">{account.name}</span>
              </div>
              <span className="font-bold text-gray-800">{formatCurrency(account.balance)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tarjetas de Crédito */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Tarjetas de Crédito</h2>
        <div className="space-y-4">
          {creditCards.map(card => {
            const usage = (card.debt / card.limit) * 100;
            return (
              <div key={card.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">{card.name}</h3>
                  <span className="text-sm text-gray-600">Vence: {card.dueDate}</span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Deuda: {formatCurrency(card.debt)}</span>
                    <span>Límite: {formatCurrency(card.limit)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${usage > 80 ? 'bg-red-500' : usage > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${usage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{usage.toFixed(1)}% utilizado</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;