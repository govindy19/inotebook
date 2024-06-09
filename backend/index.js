const connectToMongo = require("./db");

const express = require("express");
var cors = require("cors");
connectToMongo();

const app = express();
const port = 8000;

//
app.get("/", (req, res) =>{
  res.send('Hello Govind!')

})//
app.use(cors());
app.use(express.json());

//Avaible Routes
app.use('/api/auth', require('./routes/auth'))

app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening  at http://localhost: ${port}`);
});
