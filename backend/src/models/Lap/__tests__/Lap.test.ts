import Lap from '../Lap';
import { canvas, city } from '../../../data/testsData';
import appDataSource from '../../../database/AppDataSource';


describe('Model Lap methods', () => {

  beforeEach(async () => {
    await appDataSource.initialize();
  });

  afterEach(async () => {
    await appDataSource.destroy();
  });

  test('findByCanvas should return an array of laps', async () => {
    const result = await Lap.findByCanvas(canvas);
    expect(result).toBeInstanceOf(Array);
    result.forEach(lap => {
      expect(lap).toBeInstanceOf(Lap);
    });
  });

  test('findByCity should return an array of laps', async () => {
    const result = await Lap.findByCity(city);
    expect(result).toBeInstanceOf(Array);
    result.forEach(lap => {
      expect(lap).toBeInstanceOf(Lap);
    });
  });
});