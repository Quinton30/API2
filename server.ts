import express, { Request, Response } from 'express';
import cors from 'cors';
const studentRoutes = require('./src/movie/routes')

const app: express.Application = express();
const port: number = 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.use('/api/v1/movies', studentRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));
