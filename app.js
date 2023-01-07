require('dotenv').config();
const express = require('express');
const cors = require("cors");
const dbConnect = require('./models/db');

const app = express();
const port = process.env.PORT || 3000;
dbConnect();

app.use(cors());

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
