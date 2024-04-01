import request from 'supertest';
import express from 'express';
import lapWs from '../lapWs';
import Lap from '../../../models/Lap/Lap';

// Mock the Lap.findByCanvas method
jest.mock('../../../models/Lap/Lap', () => ({
  findByCanvas: jest.fn(),
}));

describe('Controller laps GET', () => {
  let app: express.Express;

  const getCanvasQuery = {
    northWest: '45.801458 1.288412',
    northEst: '45.801458 1.299458',
    southEst: '45.796295 1.300004',
    southWest: '45.796803 1.290658',
  };

  beforeEach(() => {
    app = express();
    app.use(lapWs);
  });

  test('Should return 200 and the laps', async () => {
    const mockLaps = [{ id: 1 }, { id: 2 }];
    (Lap.findByCanvas as jest.Mock).mockResolvedValue(mockLaps);

    const res = await request(app).get('/laps').query(getCanvasQuery);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockLaps);
  });

  test('Should return 500 if there is an error', async () => {
    (Lap.findByCanvas as jest.Mock).mockRejectedValue(new Error('Test error'));

    const res = await request(app).get('/laps').query(getCanvasQuery);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({ message: 'Internal server error' });
  });
});