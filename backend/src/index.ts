import express from 'express';
import AppDataSource from './database/AppDataSource';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, async () => {
  await AppDataSource.initialize();
  console.log(`laps-map app listening on port ${port}`)
});