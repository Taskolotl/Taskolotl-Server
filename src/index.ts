import * as express from "express";
const app = express();
const port = 3000;

app.use(express.static("assets"));
app.use(express.static("client/dist"));

app.get('/', (req, res) => {
    res.sendFile("homepage.html", {root: "./assets"});
})

// GET request route handler
app.get('/api/data', (req, res) => {
    // Simulated data - replace with your actual data retrieval logic
    const data = [];
  
    for (let i = 0; i < 50; i++) {
        const stringData = `Data ${i}`;
        const pairData = [
          ['key1', true],
          ['key2', false],
          ['key3', true],
        ];
    
        const bundle = {
          categoryName: stringData,
          taskData: pairData,
        };
    
        data.push(bundle);
      }

    res.json(data);
  });

app.listen(port, () => {
    console.log("Example app listening on port ${port}");
})
