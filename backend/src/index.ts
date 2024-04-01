import express from 'express';
import cors from 'cors';
import lapWs from './controllers/lapWs/lapWs';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Bind modules router
app.use('/api', lapWs);

export default app;