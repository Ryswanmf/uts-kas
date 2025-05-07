const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cash_flow_db'
});

// Open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
  
  // Create transactions table if it doesn't exist
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('income', 'expense') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
  
  connection.query(createTableQuery, (err, results) => {
    if (err) throw err;
    console.log('Transactions table created or already exists');
  });
});

module.exports = connection;