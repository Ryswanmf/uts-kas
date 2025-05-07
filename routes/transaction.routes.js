// routes/transaction.routes.js
module.exports = app => {
    const transactions = require('../controllers/transaction.controller.js');
    
    // Create a new Transaction
    app.post('/api/transactions', transactions.create);
    
    // Retrieve all Transactions
    app.get('/api/transactions', transactions.findAll);
    
    // Retrieve Transaction summary
    app.get('/api/transactions/summary', transactions.getSummary);
    
    // Retrieve a single Transaction with id
    app.get('/api/transactions/:id', transactions.findOne);
    
    // Update a Transaction with id
    app.put('/api/transactions/:id', transactions.update);
    
    // Delete a Transaction with id
    app.delete('/api/transactions/:id', transactions.delete);
    
    // Delete all Transactions
    app.delete('/api/transactions', transactions.deleteAll);
  };