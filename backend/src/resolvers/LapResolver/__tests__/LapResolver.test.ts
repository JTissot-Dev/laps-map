import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import 'reflect-metadata';
import LapResolver from '../LapResolver';
import Lap from '../../../models/Lap/Lap';
import startApolloServer from '../../../startApolloServer';
import { canvas, city } from '../../../data/testsData';
import request from 'supertest';


const mockLap1 = new Lap();
mockLap1.id = 1;
const mockLap2 = new Lap();
mockLap2.id = 2;
const mockLaps: Lap[] = [
  mockLap1,
  mockLap2,
];
jest.spyOn(Lap, 'findByCanvas').mockImplementation(() => Promise.resolve(mockLaps));

describe('Resolver laps GET', () => {
  let app: express.Express;
  let apolloServer: ApolloServer;
  let httpServer: http.Server;

  const queryByCanvas = {
    query: `query GetLaps($canvas: CanvasInput!){
      lapsByCanvas(canvas: $canvas) {
        id
      }
    }`,
    variables: { canvas: canvas },
  };

  const queryByCity = {
    query: `query GetLaps($canvas: CanvasInput!){
      lapsByCity(canvas: $canvas) {
        id
      }
    }`,
    variables: { city: city },
  };

  beforeEach(async () => {
    app = express();
    const response = await startApolloServer([LapResolver], app);
    apolloServer = response.apolloServer;
    httpServer = response.httpServer;
  });

  afterEach(async () => {
    await apolloServer.stop();
    httpServer.close();
  });

  test('queryByCanvas Should return laps', async () => {
    
    (Lap.findByCanvas as jest.Mock).mockResolvedValue(mockLaps);
    const response = await request(app).post('/').send(queryByCanvas);

    expect(response.body.data.lapsByCanvas.map(laps => Number(laps.id)))
      .toEqual(mockLaps.map(lap => lap.id));

  });

  test('queryByCanvas Should return error message if there is an error', async () => {

    (Lap.findByCanvas as jest.Mock).mockRejectedValue(new Error('Test error'));
    const response = await request(app).post('/').send(queryByCanvas);
    
    expect(response.body.errors[0].message).toBe('Internal server error');

  });

  test('queryByCity Should return laps', async () => {
    
    (Lap.findByCanvas as jest.Mock).mockResolvedValue(mockLaps);
    const response = await request(app).post('/').send(queryByCity);

    expect(response.body.data.lapsByCity.map(laps => Number(laps.id)))
      .toEqual(mockLaps.map(lap => lap.id));

  });

  test('queryByCity Should return error message if there is an error', async () => {

    (Lap.findByCanvas as jest.Mock).mockRejectedValue(new Error('Test error'));
    const response = await request(app).post('/').send(queryByCity);
    
    expect(response.body.errors[0].message).toBe('Internal server error');

  });
});