const sqlite3 = require('sqlite3').verbose();

// Function to clear all entries from the table
function clearAllEntries() {
  const db = new sqlite3.Database('mydatabase.db');

  // Delete all entries from the table
  const query = `DELETE FROM entries`;
  db.run(query, [], function (err) {
    if (err) {
      console.error('Error clearing entries:', err.message);
    } else {
      console.log('All entries cleared successfully!');
    }
  });

  // Close the database connection
  db.close();
}

// Example usage:
clearAllEntries();