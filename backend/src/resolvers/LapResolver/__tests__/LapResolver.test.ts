import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import 'reflect-metadata';
import LapResolver from '../LapResolver';
import Lap from '../../../models/Lap/Lap';
import startApolloServer from '../../../startApolloServer';
import CanvasInput from '../../../types/CanvasInput';
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

  const testCanvas: CanvasInput = {
    northWest: '45.801458 1.288412',
    northEst: '45.801458 1.299458',
    southEst: '45.796295 1.300004',
    southWest: '45.796803 1.290658',
  };

  const queryData = {
    query: `query GetLaps($canvas: CanvasInput!){
      laps(canvas: $canvas) {
        id
      }
    }`,
    variables: { canvas: testCanvas },
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

  test('Should return laps', async () => {
    
    (Lap.findByCanvas as jest.Mock).mockResolvedValue(mockLaps);
    const response = await request(app).post('/').send(queryData);

    expect(response.body.data.laps.map(laps => Number(laps.id)))
      .toEqual(mockLaps.map(lap => lap.id));

  });

  test('Should return error message if there is an error', async () => {

    (Lap.findByCanvas as jest.Mock).mockRejectedValue(new Error('Test error'));
    const response = await request(app).post('/').send(queryData);
    
    expect(response.body.errors[0].message).toBe('Internal server error');

  });
});