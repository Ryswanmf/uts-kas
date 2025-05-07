// models/transaction.model.js
const sql = require('../config/db.config');

// Constructor
const Transaction = function(transaction) {
  this.type = transaction.type;
  this.amount = transaction.amount;
  this.description = transaction.description;
  this.date = transaction.date;
};

// Create a new Transaction
Transaction.create = (newTransaction, result) => {
  sql.query('INSERT INTO transactions SET ?', newTransaction, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }
    
    console.log('Created transaction: ', { id: res.insertId, ...newTransaction });
    result(null, { id: res.insertId, ...newTransaction });
  });
};

// Find a Transaction by Id
Transaction.findById = (id, result) => {
  sql.query(`SELECT * FROM transactions WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }
    
    if (res.length) {
      console.log('Found transaction: ', res[0]);
      result(null, res[0]);
      return;
    }
    
    // Transaction with the id not found
    result({ kind: 'not_found' }, null);
  });
};

// Get all Transactions
Transaction.getAll = (type, result) => {
  let query = 'SELECT * FROM transactions';
  
  if (type) {
    query += ` WHERE type = '${type}'`;
  }
  
  query += ' ORDER BY date DESC';
  
  sql.query(query, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }
    
    console.log('Transactions: ', res);
    result(null, res);
  });
};

// Get summary of transactions (total income, expense, balance)
Transaction.getSummary = (result) => {
  const query = `
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense,
      SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as balance
    FROM transactions
  `;
  
  sql.query(query, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }
    
    console.log('Summary: ', res[0]);
    result(null, res[0]);
  });
};

// Update a Transaction
Transaction.updateById = (id, transaction, result) => {
  sql.query(
    'UPDATE transactions SET type = ?, amount = ?, description = ?, date = ? WHERE id = ?',
    [transaction.type, transaction.amount, transaction.description, transaction.date, id],
    (err, res) => {
      if (err) {
        console.log('Error: ', err);
        result(err, null);
        return;
      }
      
      if (res.affectedRows == 0) {
        // Transaction with the id not found
        result({ kind: 'not_found' }, null);
        return;
      }
      
      console.log('Updated transaction: ', { id: id, ...transaction });
      result(null, { id: id, ...transaction });
    }
  );
};

// Delete a Transaction
Transaction.remove = (id, result) => {
  sql.query('DELETE FROM transactions WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }
    
    if (res.affectedRows == 0) {
      // Transaction with the id not found
      result({ kind: 'not_found' }, null);
      return;
    }
    
    console.log('Deleted transaction with id: ', id);
    result(null, res);
  });
};

// Delete all Transactions
Transaction.removeAll = result => {
  sql.query('DELETE FROM transactions', (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }
    
    console.log(`Deleted ${res.affectedRows} transactions`);
    result(null, res);
  });
};

module.exports = Transaction;