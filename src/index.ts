import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Success' });
});

app.use('/', routes);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
