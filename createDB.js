const sqlite3 = require('sqlite3').verbose();

function createCategoryTable() {
    const tableName = 'CategoryTable';
  
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        datetime TEXT,
        score REAL
      );
    `;
  
    // Open the database connection
    const db = new sqlite3.Database('mydatabase.db');
  
    // Execute the query to create the table
    db.run(createTableQuery, (error) => {
      if (error) {
        console.error('Error creating table:', error);
      } else {
        console.log(`Table "${tableName}" created successfully.`);
      }
  
      // Close the database connection
      db.close();
    });
  }

  function createGlobalAverageTable() {
    const tableName = 'GlobalAverageTable';
  
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        datetime TEXT,
        average REAL,
        previousAverage REAL,
        score REAL
      );
    `;
  
    // Open the database connection
    const db = new sqlite3.Database('mydatabase.db');
  
    // Execute the query to create the table
    db.run(createTableQuery, (error) => {
      if (error) {
        console.error('Error creating table:', error);
      } else {
        console.log(`Table "${tableName}" created successfully.`);
      }
  
      // Close the database connection
      db.close();
    });
  }

// Create a new database or open an existing one
const db = new sqlite3.Database('mydatabase.db');

// Create the table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      datetime TEXT,
      category TEXT,
      name TEXT,
      finished INTEGER
    )
  `);
});

// Close the database connection
db.close();

createCategoryTable();