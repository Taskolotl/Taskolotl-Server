const sqlite3 = require('sqlite3').verbose();

function getCurrentDate() {
    const currentDate = new Date();
  
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Note: January is 0
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = String(currentDate.getFullYear());
  
    const formattedDate = `${month}-${day}-${year}`;
  
    return formattedDate;
}

function addEntryToCategoryTable(date, category, average, previousAverage, score) {
    const db = new sqlite3.Database('mydatabase.db');
    const tableName = 'CategoryTable';
  
    // Construct the SQL query to insert a new entry into the table
    const query = `
      INSERT INTO ${tableName} (datetime, category, score)
      VALUES (?, ?, ?);
    `;
  
    // Execute the query to insert the new entry
    db.run(query, [date, category, score], function (error) {
      if (error) {
      } else {
      }
  
      // Close the database connection
      db.close();
    });
}

