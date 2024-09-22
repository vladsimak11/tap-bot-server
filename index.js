const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const { DB_HOST, PORT = 5555} = process.env;

const dataScore = require("./src/routes/api/data");

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/data", dataScore);

app.get('/', (req, res) => {
  res.send('Ready to use!');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});
  
app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message, })
});

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful! Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });