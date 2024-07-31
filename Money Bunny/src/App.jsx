import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState('');
  const [remainingBudget, setRemainingBudget] = useState(null);

  const addNewTransaction = (event) => {
    event.preventDefault();
    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount)) {
      alert('Please enter a valid amount');
      return;
    }
    const isExpense = transactionAmount < 0;
    const newTransaction = {
      name,
      datetime,
      description,
      price: transactionAmount,
      isExpense,
    };
    setTransactions([...transactions, newTransaction]);
    setRemainingBudget((prev) => prev - transactionAmount);
    // Reset the form fields
    setName('');
    setDatetime('');
    setDescription('');
    setAmount('');
  };

  const handleSetBudget = (event) => {
    event.preventDefault();
    const parsedBudget = parseFloat(budget);
    if (isNaN(parsedBudget)) {
      alert('Please enter a valid budget');
      return;
    }
    setRemainingBudget(parsedBudget);
    setBudget('');
  };

  return (
    <main>
      <h1>Remaining Budget: ${remainingBudget !== null ? remainingBudget.toFixed(2) : 'Set your budget'}</h1>
      <form onSubmit={handleSetBudget}>
        <input 
          type="number" 
          value={budget}
          onChange={(ev) => setBudget(ev.target.value)}
          placeholder="Set monthly budget" 
        />
        <button type="submit">Set Budget</button>
      </form>
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input 
            type="text" 
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="New smartphone" 
          />
          <input 
            value={datetime}
            onChange={(ev) => setDatetime(ev.target.value)}
            type="datetime-local"
          />
        </div>
        <div className='description'>      
          <input 
            type="text" 
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="Description"
          />
        </div>
        <div className='amount'>
          <input 
            type="number" 
            value={amount}
            onChange={(ev) => setAmount(ev.target.value)}
            placeholder="Amount"
          />
        </div>
        <button type="submit">Add new transaction</button>
        <div className='transactions'>
          {transactions.map((transaction, index) => (
            <div className="transaction" key={index}>
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div className={`price ${transaction.isExpense ? 'red' : 'green'}`}>
                  {transaction.isExpense ? '-' : ''}${Math.abs(transaction.price).toFixed(2)}
                </div>
                <div className="datetime">{transaction.datetime}</div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </main>
  );
}

export default App;
