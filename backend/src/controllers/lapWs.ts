import express, { Router } from 'express';
import Lap from '../models/Lap';
import Canvas from '../types/Canvas';


const lapWs: Router = express.Router();

lapWs.get('/laps', async (req, res) => {

  try {
    const canvas: Canvas = {
      minLat: String(req.query.minLat),
      maxLat: String(req.query.maxLat),
      minLon: String(req.query.minLon),
      maxLon: String(req.query.maxLon)
    };
    const laps: Lap[] = await Lap.findByCanvas(canvas);
    res.status(200).json(laps);
    
  } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
  }

});

export default lapWs;