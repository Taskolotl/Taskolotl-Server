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


// Example usage:
addEntry(getCurrentDate(), "Faith", "Pray", false);
addEntry(getCurrentDate(), "Faith", "Truly and honestly seek God", false);
addEntry(getCurrentDate(), "Faith", "NF", false);
addEntry(getCurrentDate(), "Faith", "No swearing", false);
addEntry(getCurrentDate(), "Faith", "Read scripture", false);
addEntry(getCurrentDate(), "Faith", "Do not read scans you did not pay for", false);

addEntry(getCurrentDate(), "Current Relationships", "Mom", false);
addEntry(getCurrentDate(), "Current Relationships", "Dad", false);
addEntry(getCurrentDate(), "Current Relationships", "Charlie", false);
addEntry(getCurrentDate(), "Current Relationships", "Ryan", false);
addEntry(getCurrentDate(), "Current Relationships", "Max", false);
addEntry(getCurrentDate(), "Current Relationships", "Joey", false);

addEntry(getCurrentDate(), "Diet", "Get enough fruit", false);
addEntry(getCurrentDate(), "Diet", "Get enough veggies", false);
addEntry(getCurrentDate(), "Diet", "Get enough protein", false);
addEntry(getCurrentDate(), "Diet", "Get enough carbs", false);
addEntry(getCurrentDate(), "Diet", "Get enough water", false);

addEntry(getCurrentDate(), "Studying", "One unit study gamedev", false);
addEntry(getCurrentDate(), "Studying", "One unit study webdev frontend", false);
addEntry(getCurrentDate(), "Studying", "One unit study backend", false);
addEntry(getCurrentDate(), "Studying", "One unit study UI UX", false);
addEntry(getCurrentDate(), "Studying", "One unit study Project Management", false);
addEntry(getCurrentDate(), "Studying", "One unit study C++", false);
addEntry(getCurrentDate(), "Studying", "One unit study Java", false);
addEntry(getCurrentDate(), "Studying", "One unit study Typescript", false);
addEntry(getCurrentDate(), "Studying", "One unit study Security", false);
addEntry(getCurrentDate(), "Studying", "One unit study cooking", false);

addEntry(getCurrentDate(), "Atlas", "15 minutes play", false);
addEntry(getCurrentDate(), "Atlas", "15 minutes pets", false);
addEntry(getCurrentDate(), "Atlas", "Greenies", false);
addEntry(getCurrentDate(), "Atlas", "Proper Diet", false);
addEntry(getCurrentDate(), "Atlas", "Clean water", false);
addEntry(getCurrentDate(), "Atlas", "Litter box", false);

addEntry(getCurrentDate(), "Housework", "One unit living room trash pickup", false);
addEntry(getCurrentDate(), "Housework", "One unit living room vacuum", false);
addEntry(getCurrentDate(), "Housework", "One unit living room clutter", false);
addEntry(getCurrentDate(), "Housework", "One unit living room laundry pickup", false);
addEntry(getCurrentDate(), "Housework", "Clean bathroom sink", false);
addEntry(getCurrentDate(), "Housework", "Clean bathroom mirror", false);
addEntry(getCurrentDate(), "Housework", "Clean tub if it needs cleaning", false);
addEntry(getCurrentDate(), "Housework", "Clean shower walls if needed", false);
addEntry(getCurrentDate(), "Housework", "Wash bathroom floor if needed", false);
addEntry(getCurrentDate(), "Housework", "Clean fridge if needed", false);
addEntry(getCurrentDate(), "Housework", "One unit kitchen trash", false);
addEntry(getCurrentDate(), "Housework", "Dishes completely done", false);
addEntry(getCurrentDate(), "Housework", "One unit wash counters and sink", false);
addEntry(getCurrentDate(), "Housework", "Wash stove if needed", false);
addEntry(getCurrentDate(), "Housework", "Clean kitchen floor if needed", false);
addEntry(getCurrentDate(), "Housework", "One unit kitchen clutter", false);
addEntry(getCurrentDate(), "Housework", "Do a load of laundry if there is enough", false);
addEntry(getCurrentDate(), "Housework", "One unit vacuum office", false);
addEntry(getCurrentDate(), "Housework", "One unit office clutter", false);
addEntry(getCurrentDate(), "Housework", "One unit office trash", false);
addEntry(getCurrentDate(), "Housework", "Clean litter boxes", false);
addEntry(getCurrentDate(), "Housework", "Take out trash if its full", false);
addEntry(getCurrentDate(), "Housework", "One unit vacuum dining room", false);
addEntry(getCurrentDate(), "Housework", "One unit trash dining room", false);
addEntry(getCurrentDate(), "Housework", "One unit clutter dining room", false);
addEntry(getCurrentDate(), "Housework", "Shred junk mail", false);
addEntry(getCurrentDate(), "Housework", "Get mail", false);
addEntry(getCurrentDate(), "Housework", "One unit vacuum hallway", false);

addEntry(getCurrentDate(), "Gamedev", "One unit gamedev", false);

addEntry(getCurrentDate(), "Webdev", "One unit webdev", false);

addEntry(getCurrentDate(), "Hygiene", "Dental trio one", false);
addEntry(getCurrentDate(), "Hygiene", "Dental trio two", false);
addEntry(getCurrentDate(), "Hygiene", "Shower", false);
addEntry(getCurrentDate(), "Hygiene", "Wash face one", false);
addEntry(getCurrentDate(), "Hygiene", "Moisturize one", false);
addEntry(getCurrentDate(), "Hygiene", "Moisturize two", false);
addEntry(getCurrentDate(), "Hygiene", "Wash face two", false);
addEntry(getCurrentDate(), "Hygiene", "Zits + acne patches", false);
addEntry(getCurrentDate(), "Hygiene", "Shave", false);
addEntry(getCurrentDate(), "Hygiene", "New pillowcase", false);

addEntry(getCurrentDate(), "Exercise", "Exercise", false);

addEntry(getCurrentDate(), "Wakeup", "Wake up at 6AM. Get right out of bed", false);

addEntry(getCurrentDate(), "Galatians", "Find a moment to be patient", false);
addEntry(getCurrentDate(), "Galatians", "Find a moment to be kind", false);
addEntry(getCurrentDate(), "Galatians", "Find a moment to be humble", false);
addEntry(getCurrentDate(), "Galatians", "Find a moment to be generous", false);
addEntry(getCurrentDate(), "Galatians", "Find a moment to hold back from anger", false);

addEntry(getCurrentDate(), "Work", "5 hours of concentrated work", false);



