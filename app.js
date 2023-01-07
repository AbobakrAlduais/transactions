require('dotenv').config();
const express = require('express');
const cors = require("cors");
const dbConnect = require('./models/db');
const { transactionRouter } = require('./routes');

const app = express();
const port = process.env.PORT || 3000;
dbConnect();

app.use(cors());
app.use("/transaction", transactionRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
