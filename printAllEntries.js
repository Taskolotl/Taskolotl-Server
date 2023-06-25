const sqlite3 = require('sqlite3').verbose();

// Function to print all entries in the table
function printAllEntries() {
  const db = new sqlite3.Database('mydatabase.db');

  // Select all entries from the table
  const query = `SELECT * FROM entries`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error retrieving entries:', err.message);
    } else {
      // Print each entry
      rows.forEach((row) => {
        console.log(`Datetime: ${row.datetime}`);
        console.log(`Category: ${row.category}`);
        console.log(`Name: ${row.name}`);
        console.log(`Finished: ${row.finished}`);
        console.log('---');
      });
    }
  });

  // Close the database connection
  db.close();
}

// Example usage:
printAllEntries();