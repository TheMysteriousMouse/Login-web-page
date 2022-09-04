const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Configures .env variables and sets its path
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  'PASSWORD',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(() => console.log('Successful DB connection'))
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
app.listen(process.env.PORT, () =>
  console.log(`Server Success at port:${port}`),
);
