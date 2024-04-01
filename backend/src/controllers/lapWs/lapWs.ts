import express, { Router } from 'express';
import Lap from '../../models/Lap/Lap';
import Canvas from '../../types/Canvas';


const lapWs: Router = express.Router();

lapWs.get('/laps', async (req, res) => {

  try {
    const canvas: Canvas = {
      northWest: String(req.query.northWest),
      northEst: String(req.query.northEst),
      southEst: String(req.query.southEst),
      southWest: String(req.query.southWest)
    };
    const laps: Lap[] = await Lap.findByCanvas(canvas);
    res.status(200).json(laps);
    
  } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
  }

});

export default lapWs;