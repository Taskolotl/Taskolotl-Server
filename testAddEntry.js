const sqlite3 = require('sqlite3').verbose();

function getCurrentDate() {
    const currentDate = new Date();
  
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Note: January is 0
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = String(currentDate.getFullYear());
  
    const formattedDate = `${month}-${day}-${year}`;
  
    return formattedDate;
  }


// Function to add an entry to the table
function addEntry(datetime, category, name, finished) {
  const db = new sqlite3.Database('mydatabase.db');

  // Insert the entry into the table
  const query = `
    INSERT INTO entries (datetime, category, name, finished)
    VALUES (?, ?, ?, ?)
  `;
  db.run(query, [datetime, category, name, finished], function (err) {
    if (err) {
      console.error('Error inserting entry:', err.message);
    } else {
      console.log('Entry added successfully!');
    }
  });

  // Close the database connection
  db.close();
}




