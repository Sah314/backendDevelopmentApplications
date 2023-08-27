import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import sequelize from './db'; // Adjust the path to your db.ts file
require('dotenv').config();

import session from 'express-session';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
      secret: 'MXaQ3Zr60TWtssS', 
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false, 
      },
    })
  );

app.use('/', routes);


sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
