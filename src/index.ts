import * as express from "express";
const app = express();
const port = 3000;

app.use(express.static("assets"));
app.use(express.static("client/dist"));

app.get('/', (req, res) => {
    res.sendFile("homepage.html", {root: "./assets"});
})

app.listen(port, () => {
    console.log("Example app listening on port ${port}");
})
