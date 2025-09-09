// src/components/Navigation.jsx
import React from 'react';
import { 
  Home, 
  CreditCard, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  Wallet
} from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'accounts', label: 'Cuentas', icon: Wallet },
    { id: 'transactions', label: 'Transacciones', icon: DollarSign },
    { id: 'cards', label: 'Tarjetas', icon: CreditCard },
    { id: 'payments', label: 'Pagos', icon: Calendar },
    { id: 'investments', label: 'Inversiones', icon: TrendingUp }
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;