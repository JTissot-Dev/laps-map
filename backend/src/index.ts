import express from 'express';
import cors from 'cors';
import AppDataSource from './database/AppDataSource';
import lapWs from './controllers/lapWs';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Bind modules router
app.use('/api', lapWs);

const port = 4000;

app.listen(port, async () => {
  await AppDataSource.initialize();
  console.log(`laps-map app listening on port ${port}`)
});