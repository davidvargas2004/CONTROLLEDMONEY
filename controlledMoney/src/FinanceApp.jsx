// src/FinanceApp.jsx
import React, { useState } from 'react';

// Components
import Header from './components/Header';
import Navigation from './components/Navigation';
import Modal from './components/Modal';

// Pages
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Cards from './pages/Cards';
import Payments from './pages/Payments';
import Investments from './pages/Investments';

// Utils
// No necesitamos importar formatCurrency directamente aquí si solo se usa en Header y Pages
// import { formatCurrency } from './utils/format'; 

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

  // Funciones para manejar formularios
  const openModal = (type) => {
    setModalType(type);
    setFormData({}); // Limpiar el formulario al abrir
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({}); // Limpiar el formulario al cerrar
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
          recurring: formData.recurring === 'true', // Asegurarse que es booleano
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
        // Considerar actualizar el balance de la cuenta al eliminar una transacción
        const deletedTransaction = transactions.find(t => t.id === id);
        if (deletedTransaction) {
            setAccounts(accounts.map(acc => {
                if (acc.id === deletedTransaction.account) {
                    const newBalance = deletedTransaction.type === 'income' 
                        ? acc.balance - deletedTransaction.amount
                        : acc.balance + deletedTransaction.amount;
                    return { ...acc, balance: newBalance };
                }
                return acc;
            }));
        }
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
      default:
        break;
    }
  };

  // Renderizado del contenido según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            accounts={accounts}
            transactions={transactions}
            creditCards={creditCards}
            getTotalBalance={getTotalBalance}
            getTotalIncome={getTotalIncome}
            getTotalExpenses={getTotalExpenses}
            getTotalDebt={getTotalDebt}
          />
        );
      case 'accounts':
        return (
          <Accounts 
            accounts={accounts} 
            openModal={openModal} 
            deleteItem={deleteItem} 
          />
        );
      case 'transactions':
        return (
          <Transactions 
            transactions={transactions} 
            openModal={openModal} 
            deleteItem={deleteItem} 
          />
        );
      case 'cards':
        return (
          <Cards 
            creditCards={creditCards} 
            openModal={openModal} 
            deleteItem={deleteItem} 
          />
        );
      case 'payments':
        return (
          <Payments 
            scheduledPayments={scheduledPayments} 
            accounts={accounts} // Necesario para mostrar el nombre de la cuenta
            openModal={openModal} 
            deleteItem={deleteItem} 
          />
        );
      case 'investments':
        return (
          <Investments 
            investments={investments} 
            openModal={openModal} 
            deleteItem={deleteItem} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header totalBalance={getTotalBalance()} />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Modal para formularios */}
      {showModal && (
        <Modal 
          title={
            modalType === 'account' ? 'Agregar Cuenta' :
            modalType === 'transaction' ? 'Nueva Transacción' :
            modalType === 'creditCard' ? 'Agregar Tarjeta de Crédito' :
            modalType === 'payment' ? 'Nuevo Pago Programado' :
            modalType === 'investment' ? 'Nueva Inversión' : ''
          }
          onClose={closeModal}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {modalType === 'account' && (
              <>
                <div>
                  <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-2">Nombre de la cuenta</label>
                  <input
                    type="text"
                    id="accountName"
                    name="name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name || ''}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-2">Tipo de cuenta</label>
                  <select
                    id="accountType"
                    name="type"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.type || ''}
                    onChange={handleFormChange}
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="bank">Bancaria</option>
                    <option value="cash">Efectivo</option>
                    <option value="savings">Ahorros</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="accountBalance" className="block text-sm font-medium text-gray-700 mb-2">Balance inicial</label>
                  <input
                    type="number"
                    id="accountBalance"
                    name="balance"
                    min="0"
                    step="1000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.balance || ''}
                    onChange={handleFormChange}
                  />
                </div>
              </>
            )}

            {modalType === 'transaction' && (
              <>
                <div>
                  <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700 mb-2">Tipo de transacción</label>
                  <select
                    id="transactionType"
                    name="type"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.type || ''}
                    onChange={handleFormChange}
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="income">Ingreso</option>
                    <option value="expense">Gasto</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="transactionAmount" className="block text-sm font-medium text-gray-700 mb-2">Monto</label>
                  <input
                    type="number"
                    id="transactionAmount"
                    name="amount"
                    required
                    min="0"
                    step="1000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.amount || ''}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="transactionCategory" className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <input
                    type="text"
                    id="transactionCategory"
                    name="category"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.category || ''}
                    onChange={handleFormChange}
                    placeholder="Ej: Salario, Arriendo, Mercado"
                  />
                </div>
                <div>
                  <label htmlFor="transactionDescription" className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <input
                    type="text"
                    id="transactionDescription"
                    name="description"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.description || ''}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="transactionAccount" className="block text-sm font-medium text-gray-700 mb-2">Cuenta</label>
                  <select
                    id="transactionAccount"
                    name="account"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.account || ''}
                    onChange={handleFormChange}
                  >
                    <option value="">Seleccionar cuenta</option>
                    {accounts.map(account => (
                      <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="transactionDate" className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                  <input
                    type="date"
                    id="transactionDate"
                    name="date"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.date || new Date().toISOString().split('T')[0]}
                    onChange={handleFormChange}
                  />
                </div>
              </>
            )}

            {modalType === 'creditCard' && (
              <>
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">Nombre de la tarjeta</label>
                  <input
                    type="text"
                    id="cardName"
                    name="name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name || ''}
                    onChange={handleFormChange}
                    placeholder="Ej: Visa Gold, MasterCard"
                  />
                </div>
                <div>
                  <label htmlFor="cardLimit" className="block text-sm font-medium text-gray-700 mb-2">Límite de crédito</label>
                  <input
                    type="number"
                    id="cardLimit"
                    name="limit"
                    required
                    min="0"
                    step="100000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.limit || ''}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="cardDebt" className="block text-sm font-medium text-gray-700 mb-2">Deuda actual</label>
                  <input
                    type="number"
                    id="cardDebt"
                    name="debt"
                    min="0"
                    step="10000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.debt || ''}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="cardDueDate" className="block text-sm font-medium text-gray-700 mb-2">Fecha de vencimiento</label>
                  <input
                    type="date"
                    id="cardDueDate"
                    name="dueDate"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.dueDate || ''}
                    onChange={handleFormChange}
                  />
                </div>
              </>
            )}

            {modalType === 'payment' && (
              <>
                <div>
                  <label htmlFor="paymentName" className="block text-sm font-medium text-gray-700 mb-2">Nombre del pago</label>
                  <input
                    type="text"
                    id="paymentName"
                    name="name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name || ''}
                    onChange={handleFormChange}
                    placeholder="Ej: Arriendo, Internet, Luz"
                  />
                </div>
                <div>
                  <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700 mb-2">Monto</label>
                  <input
                    type="number"
                    id="paymentAmount"
                    name="amount"
                    required
                    min="0"
                    step="1000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.amount || ''}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="paymentDueDate" className="block text-sm font-medium text-gray-700 mb-2">Fecha de vencimiento</label>
                  <input
                    type="date"
                    id="paymentDueDate"
                    name="dueDate"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.dueDate || ''}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700 mb-2">Tipo de pago</label>
                  <select
                    id="paymentType"
                    name="recurring"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.recurring || ''}
                    onChange={handleFormChange}
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="true">Recurrente</option>
                    <option value="false">Único</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="paymentAccount" className="block text-sm font-medium text-gray-700 mb-2">Cuenta de pago</label>
                  <select
                    id="paymentAccount"
                    name="account"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.account || ''}
                    onChange={handleFormChange}
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
                  <label htmlFor="investmentName" className="block text-sm font-medium text-gray-700 mb-2">Nombre de la inversión</label>
                  <input
                    type="text"
                    id="investmentName"
                    name="name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name || ''}
                    onChange={handleFormChange}
                    placeholder="Ej: CDT Bancolombia, Fondo Mutuo"
                  />
                </div>
                <div>
                  <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-2">Monto invertido</label>
                  <input
                    type="number"
                    id="investmentAmount"
                    name="amount"
                    required
                    min="0"
                    step="100000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.amount || ''}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="investmentRate" className="block text-sm font-medium text-gray-700 mb-2">Tasa de rendimiento anual (%)</label>
                  <input
                    type="number"
                    id="investmentRate"
                    name="rate"
                    required
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.rate || ''}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="investmentStartDate" className="block text-sm font-medium text-gray-700 mb-2">Fecha de inicio</label>
                  <input
                    type="date"
                    id="investmentStartDate"
                    name="startDate"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.startDate || ''}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="investmentEndDate" className="block text-sm font-medium text-gray-700 mb-2">Fecha de vencimiento</label>
                  <input
                    type="date"
                    id="investmentEndDate"
                    name="endDate"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.endDate || ''}
                    onChange={handleFormChange}
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