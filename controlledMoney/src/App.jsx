import React, { useState } from 'react';
import { 
  Home, 
  CreditCard, 
  PiggyBank, 
  TrendingUp, 
  Calendar,
  Plus,
  Trash2,
  Building2,
  Wallet,
  DollarSign,
  X
} from 'lucide-react';

const FinanceApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Estados para los datos
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Cuenta Corriente', type: 'bank', balance: 2500000 },
    { id: 2, name: 'Efectivo', type: 'cash', balance: 150000 },
    { id: 3, name: 'Ahorros', type: 'savings', balance: 5000000 }
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, type: 'income', amount: 3000000, category: 'Salario', description: 'Salario mensual', account: 1, date: '2024-08-01' },
    { id: 2, type: 'expense', amount: 800000, category: 'Arriendo', description: 'Pago mensual arriendo', account: 1, date: '2024-08-05' },
    { id: 3, type: 'expense', amount: 250000, category: 'Mercado', description: 'Compras supermercado', account: 2, date: '2024-08-10' }
  ]);

  const [creditCards, setCreditCards] = useState([
    { id: 1, name: 'Visa Gold', limit: 3000000, debt: 450000, dueDate: '2024-09-15' },
    { id: 2, name: 'MasterCard', limit: 2000000, debt: 180000, dueDate: '2024-09-20' }
  ]);

  const [scheduledPayments, setScheduledPayments] = useState([
    { id: 1, name: 'Arriendo', amount: 800000, dueDate: '2024-09-01', recurring: true, account: 1 },
    { id: 2, name: 'Internet', amount: 120000, dueDate: '2024-08-30', recurring: true, account: 1 }
  ]);

  const [investments, setInvestments] = useState([
    { id: 1, name: 'CDT Bancolombia', amount: 10000000, rate: 12.5, startDate: '2024-01-01', endDate: '2024-12-31' },
    { id: 2, name: 'Fondo Mutuo', amount: 5000000, rate: 8.2, startDate: '2024-03-01', endDate: '2025-03-01' }
  ]);

  // Estados para formularios
  const [formData, setFormData] = useState({});

  // Funciones de cálculo
  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  const getTotalIncome = () => {
    return transactions.filter(t => t.type === 'income').reduce((total, t) => total + t.amount, 0);
  };

  const getTotalExpenses = () => {
    return transactions.filter(t => t.type === 'expense').reduce((total, t) => total + t.amount, 0);
  };

  const getTotalDebt = () => {
    return creditCards.reduce((total, card) => total + card.debt, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getAccountIcon = (type) => {
    switch (type) {
      case 'bank': return <Building2 className="w-6 h-6" />;
      case 'cash': return <Wallet className="w-6 h-6" />;
      case 'savings': return <PiggyBank className="w-6 h-6" />;
      default: return <DollarSign className="w-6 h-6" />;
    }
  };

  // Funciones para manejar formularios
  const openModal = (type) => {
    setModalType(type);
    setFormData({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    switch (modalType) {
      case 'account':
        const newAccount = {
          id: Date.now(),
          name: formData.name,
          type: formData.type,
          balance: parseFloat(formData.balance) || 0
        };
        setAccounts([...accounts, newAccount]);
        break;
        
      case 'transaction':
        const newTransaction = {
          id: Date.now(),
          type: formData.type,
          amount: parseFloat(formData.amount),
          category: formData.category,
          description: formData.description,
          account: parseInt(formData.account),
          date: formData.date
        };
        setTransactions([...transactions, newTransaction]);
        
        // Actualizar balance de la cuenta
        setAccounts(accounts.map(acc => {
          if (acc.id === parseInt(formData.account)) {
            const newBalance = formData.type === 'income' 
              ? acc.balance + parseFloat(formData.amount)
              : acc.balance - parseFloat(formData.amount);
            return { ...acc, balance: newBalance };
          }
          return acc;
        }));
        break;
        
      case 'creditCard':
        const newCard = {
          id: Date.now(),
          name: formData.name,
          limit: parseFloat(formData.limit),
          debt: parseFloat(formData.debt) || 0,
          dueDate: formData.dueDate
        };
        setCreditCards([...creditCards, newCard]);
        break;
        
      case 'payment':
        const newPayment = {
          id: Date.now(),
          name: formData.name,
          amount: parseFloat(formData.amount),
          dueDate: formData.dueDate,
          recurring: formData.recurring === 'true',
          account: parseInt(formData.account)
        };
        setScheduledPayments([...scheduledPayments, newPayment]);
        break;
        
      case 'investment':
        const newInvestment = {
          id: Date.now(),
          name: formData.name,
          amount: parseFloat(formData.amount),
          rate: parseFloat(formData.rate),
          startDate: formData.startDate,
          endDate: formData.endDate
        };
        setInvestments([...investments, newInvestment]);
        break;
    }
    
    closeModal();
  };

  const deleteItem = (id, type) => {
    switch (type) {
      case 'account':
        setAccounts(accounts.filter(item => item.id !== id));
        break;
      case 'transaction':
        setTransactions(transactions.filter(item => item.id !== id));
        break;
      case 'creditCard':
        setCreditCards(creditCards.filter(item => item.id !== id));
        break;
      case 'payment':
        setScheduledPayments(scheduledPayments.filter(item => item.id !== id));
        break;
      case 'investment':
        setInvestments(investments.filter(item => item.id !== id));
        break;
    }
  };

  // Componente Modal
  const Modal = ({ title, children }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  // Renderizado del contenido según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
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

      case 'accounts':
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

      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">Transacciones</h1>
              <button 
                onClick={() => openModal('transaction')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Transacción</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map(transaction => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {transaction.type === 'income' ? 'Ingreso' : 'Gasto'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(transaction.amount)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button 
                            onClick={() => deleteItem(transaction.id, 'transaction')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'cards':
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

      case 'payments':
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

      case 'investments':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">Inversiones y Ahorros</h1>
              <button 
                onClick={() => openModal('investment')}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-teal-700"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Inversión</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {investments.map(investment => {
                const monthsInvested = Math.max(1, Math.ceil((new Date() - new Date(investment.startDate)) / (1000 * 60 * 60 * 24 * 30)));
                const expectedReturn = (investment.amount * investment.rate / 100 / 12) * monthsInvested;
                
                return (
                  <div key={investment.id} className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 rounded-xl text-white">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{investment.name}</h3>
                        <p className="text-sm opacity-90">Tasa: {investment.rate}% anual</p>
                      </div>
                      <button 
                        onClick={() => deleteItem(investment.id, 'investment')}
                        className="text-white hover:text-gray-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm opacity-90">Monto invertido</p>
                        <p className="text-2xl font-bold">{formatCurrency(investment.amount)}</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-90">Rendimiento estimado</p>
                        <p className="text-lg font-semibold text-green-200">{formatCurrency(expectedReturn)}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="opacity-90">Inicio</p>
                          <p className="font-medium">{investment.startDate}</p>
                        </div>
                        <div>
                          <p className="opacity-90">Vencimiento</p>
                          <p className="font-medium">{investment.endDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {investments.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Resumen de Inversiones</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Invertido</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {formatCurrency(investments.reduce((total, inv) => total + inv.amount, 0))}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Rendimiento Promedio</p>
                    <p className="text-2xl font-bold text-green-600">
                      {(investments.reduce((total, inv) => total + inv.rate, 0) / investments.length).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Inversiones Activas</p>
                    <p className="text-2xl font-bold text-blue-600">{investments.length}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-800">Mi Finanzas</h1>
            <div className="text-sm text-gray-600">
              Balance Total: <span className="font-bold text-green-600">{formatCurrency(getTotalBalance())}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'accounts', label: 'Cuentas', icon: Wallet },
              { id: 'transactions', label: 'Transacciones', icon: DollarSign },
              { id: 'cards', label: 'Tarjetas', icon: CreditCard },
              { id: 'payments', label: 'Pagos', icon: Calendar },
              { id: 'investments', label: 'Inversiones', icon: TrendingUp }
            ].map(tab => {
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Modal */}
      {showModal && (
        <Modal title={
          modalType === 'account' ? 'Agregar Cuenta' :
          modalType === 'transaction' ? 'Nueva Transacción' :
          modalType === 'creditCard' ? 'Agregar Tarjeta de Crédito' :
          modalType === 'payment' ? 'Nuevo Pago Programado' :
          modalType === 'investment' ? 'Nueva Inversión' : ''
        }>
          <form onSubmit={handleSubmit} className="space-y-4">
            {modalType === 'account' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la cuenta</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de cuenta</label>
                  <select
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.type || ''}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="bank">Bancaria</option>
                    <option value="cash">Efectivo</option>
                    <option value="savings">Ahorros</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Balance inicial</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.balance || ''}
                    onChange={(e) => setFormData({...formData, balance: e.target.value})}
                  />
                </div>
              </>
            )}

            {modalType === 'transaction' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de transacción</label>
                  <select
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.type || ''}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="income">Ingreso</option>
                    <option value="expense">Gasto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monto</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.amount || ''}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="Ej: Salario, Arriendo, Mercado"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cuenta</label>
                  <select
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.account || ''}
                    onChange={(e) => setFormData({...formData, account: e.target.value})}
                  >
                    <option value="">Seleccionar cuenta</option>
                    {accounts.map(account => (
                      <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                  <input
                    type="date"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.date || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </>
            )}

            {modalType === 'creditCard' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la tarjeta</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ej: Visa Gold, MasterCard"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Límite de crédito</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="100000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.limit || ''}
                    onChange={(e) => setFormData({...formData, limit: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deuda actual</label>
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.debt || ''}
                    onChange={(e) => setFormData({...formData, debt: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de vencimiento</label>
                  <input
                    type="date"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.dueDate || ''}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  />
                </div>
              </>
            )}

            {modalType === 'payment' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del pago</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ej: Arriendo, Internet, Luz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monto</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.amount || ''}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de vencimiento</label>
                  <input
                    type="date"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.dueDate || ''}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de pago</label>
                  <select
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.recurring || ''}
                    onChange={(e) => setFormData({...formData, recurring: e.target.value})}
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="true">Recurrente</option>
                    <option value="false">Único</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cuenta de pago</label>
                  <select
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.account || ''}
                    onChange={(e) => setFormData({...formData, account: e.target.value})}
                  >
                    <option value="">Seleccionar cuenta</option>
                    {accounts.map(account => (
                      <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {modalType === 'investment' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la inversión</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ej: CDT Bancolombia, Fondo Mutuo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monto invertido</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="100000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.amount || ''}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tasa de rendimiento anual (%)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.rate || ''}
                    onChange={(e) => setFormData({...formData, rate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de inicio</label>
                  <input
                    type="date"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.startDate || ''}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de vencimiento</label>
                  <input
                    type="date"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.endDate || ''}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancelar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default FinanceApp;










