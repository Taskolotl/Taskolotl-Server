const sqlite3 = require('sqlite3').verbose();

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