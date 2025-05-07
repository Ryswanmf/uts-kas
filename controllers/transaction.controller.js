// controllers/transaction.controller.js
const Transaction = require('../models/transaction.model.js');

// Create and Save a new Transaction
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }
  
  // Validate required fields
  if (!req.body.type || !req.body.amount || !req.body.date) {
    res.status(400).send({
      message: 'Type, amount, and date are required fields!'
    });
    return;
  }
  
  // Create a Transaction
  const transaction = new Transaction({
    type: req.body.type,
    amount: parseFloat(req.body.amount),
    description: req.body.description || '',
    date: req.body.date
  });
  
  // Save Transaction in the database
  Transaction.create(transaction, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Transaction.'
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all Transactions from the database (with condition)
exports.findAll = (req, res) => {
  const type = req.query.type;
  
  Transaction.getAll(type, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving transactions.'
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single Transaction with a id
exports.findOne = (req, res) => {
  Transaction.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Transaction with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Transaction with id ' + req.params.id
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Get summary of transactions
exports.getSummary = (req, res) => {
  Transaction.getSummary((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving transaction summary.'
      });
    } else {
      res.send(data);
    }
  });
};

// Update a Transaction identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }
  
  // Validate required fields
  if (!req.body.type || !req.body.amount || !req.body.date) {
    res.status(400).send({
      message: 'Type, amount, and date are required fields!'
    });
    return;
  }
  
  Transaction.updateById(
    req.params.id,
    new Transaction({
      type: req.body.type,
      amount: parseFloat(req.body.amount),
      description: req.body.description || '',
      date: req.body.date
    }),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Transaction with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: 'Error updating Transaction with id ' + req.params.id
          });
        }
      } else {
        res.send(data);
      }
    }
  );
};

// Delete a Transaction with the specified id
exports.delete = (req, res) => {
  Transaction.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Transaction with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Transaction with id ' + req.params.id
        });
      }
    } else {
      res.send({ message: 'Transaction was deleted successfully!' });
    }
  });
};

// Delete all Transactions from the database
exports.deleteAll = (req, res) => {
  Transaction.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all transactions.'
      });
    } else {
      res.send({ message: `All Transactions were deleted successfully!` });
    }
  });
};