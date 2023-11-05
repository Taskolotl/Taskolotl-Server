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
addEntry(getCurrentDate(), "Faith", "NP", false);
addEntry(getCurrentDate(), "Faith", "No swearing", false);
addEntry(getCurrentDate(), "Faith", "Read scripture", false);
addEntry(getCurrentDate(), "Faith", "Do not read scans you did not pay for", false);
addEntry(getCurrentDate(), "Faith", "Try to connect with people of my own faith", false);

addEntry(getCurrentDate(), "Current Relationships", "Mom", false);
addEntry(getCurrentDate(), "Current Relationships", "Dad", false);
addEntry(getCurrentDate(), "Current Relationships", "Charlie", false);
addEntry(getCurrentDate(), "Current Relationships", "Ryan", false);
addEntry(getCurrentDate(), "Current Relationships", "Max", false);
addEntry(getCurrentDate(), "Current Relationships", "Joey", false);
addEntry(getCurrentDate(), "Current Relationships", "Todd", false);

addEntry(getCurrentDate(), "Diet", "Get enough fruit", false);
addEntry(getCurrentDate(), "Diet", "Get enough veggies", false);
addEntry(getCurrentDate(), "Diet", "Get enough protein", false);
addEntry(getCurrentDate(), "Diet", "Get enough carbs", false);
addEntry(getCurrentDate(), "Diet", "Get enough water", false);
addEntry(getCurrentDate(), "Diet", "Don't eat out alone", false);

addEntry(getCurrentDate(), "Studying", "One unit new material", false);
addEntry(getCurrentDate(), "Studying", "One unit old material", false);

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
addEntry(getCurrentDate(), "Housework", "One unit bathroom trash", false);
addEntry(getCurrentDate(), "Housework", "One unit bathroom clutter", false);
addEntry(getCurrentDate(), "Housework", "One unit bathroom laundry", false);
addEntry(getCurrentDate(), "Housework", "Clean fridge if needed", false);
addEntry(getCurrentDate(), "Housework", "One unit kitchen trash", false);
addEntry(getCurrentDate(), "Housework", "Dishes", false);
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
addEntry(getCurrentDate(), "Housework", "Clean toilet", false);

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

addEntry(getCurrentDate(), "Wakeup", "Be out of bed by 7AM", false);

addEntry(getCurrentDate(), "Galatians", "Find a moment to be patient", false);
addEntry(getCurrentDate(), "Galatians", "Find a moment to be kind", false);
addEntry(getCurrentDate(), "Galatians", "Find a moment to be humble", false);
addEntry(getCurrentDate(), "Galatians", "Find a moment to be generous", false);
addEntry(getCurrentDate(), "Galatians", "Find a moment to hold back from anger", false);

addEntry(getCurrentDate(), "Work", "Pomodoro One", false);
addEntry(getCurrentDate(), "Work", "Pomodoro Two", false);
addEntry(getCurrentDate(), "Work", "Pomodoro Three", false);
addEntry(getCurrentDate(), "Work", "Pomodoro Four", false);
addEntry(getCurrentDate(), "Work", "Pomodoro Five", false);
addEntry(getCurrentDate(), "Work", "Pomodoro Six", false);
addEntry(getCurrentDate(), "Work", "Pomodoro Seven", false);
addEntry(getCurrentDate(), "Work", "Pomodoro Eight", false);
addEntry(getCurrentDate(), "Work", "Pomodoro Nine", false);
addEntry(getCurrentDate(), "Work", "Pomodoro Ten", false);
addEntry(getCurrentDate(), "Work", "Pomodoro Eleven", false);
addEntry(getCurrentDate(), "Work", "Pomodoro Twelve", false);
addEntry(getCurrentDate(), "Work", "Turn off Discord and social media", false);
addEntry(getCurrentDate(), "Work", "Phone in Do Not Disturb", false);

addEntry(getCurrentDate(), "Budget", "Manage the budget", false);

addEntry(getCurrentDate(), "New Relationships", "Work on building a rapport with a new person", false);
addEntry(getCurrentDate(), "New Relationships", "Take a risk", false);

addEntry(getCurrentDate(), "Internal", "Don't give up when it looks like I'm behind", false);
addEntry(getCurrentDate(), "Internal", "Resist goofing off when I could be productive in the evening", false);

addEntry(getCurrentDate(), "Empathy", ".Mom", false);
addEntry(getCurrentDate(), "Empathy", ".Dad", false);
addEntry(getCurrentDate(), "Empathy", ".Charlie", false);
addEntry(getCurrentDate(), "Empathy", ".Ryan", false);
addEntry(getCurrentDate(), "Empathy", ".Max", false);
addEntry(getCurrentDate(), "Empathy", ".Todd", false);
addEntry(getCurrentDate(), "Empathy", ".Joey", false);
addEntry(getCurrentDate(), "Empathy", ".Tyson", false);
addEntry(getCurrentDate(), "Empathy", ".Preston", false);
addEntry(getCurrentDate(), "Empathy", ".George", false);
addEntry(getCurrentDate(), "Empathy", ".Brian", false);
addEntry(getCurrentDate(), "Empathy", ".Matt", false);
addEntry(getCurrentDate(), "Empathy", ".Lita", false);
addEntry(getCurrentDate(), "Empathy", ".Ryan C", false);
addEntry(getCurrentDate(), "Empathy", ".God", false);



