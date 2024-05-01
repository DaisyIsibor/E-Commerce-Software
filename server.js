require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync Sequelize models to the database
sequelize.sync({ force: false }) // Set force to true to drop tables on each sync (use with caution in production)
  .then(() => {
    // Turn on the server
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync database:', error);
  });