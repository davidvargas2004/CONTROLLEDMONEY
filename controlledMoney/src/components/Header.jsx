// src/components/Header.jsx
import React from 'react';
import { formatCurrency } from '../utils/format';

const Header = ({ totalBalance }) => {
  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-800">Mi Finanzas</h1>
          <div className="text-sm text-gray-600">
            Balance Total: <span className="font-bold text-green-600">{formatCurrency(totalBalance)}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;