import Lap from '../Lap';
import Canvas from '../../../types/Canvas';
import appDataSource from '../../../database/appDataSource';


describe('Model Lap: findByCanvas', () => {
  const canvas: Canvas = {
    northWest: '45.801458 1.288412',
    northEst: '45.801458 1.299458',
    southEst: '45.796295 1.300004',
    southWest: '45.796803 1.290658',
  };

  beforeEach(async () => {
    await appDataSource.initialize();
  });

  test('Should return an array of laps', async () => {
    const result = await Lap.findByCanvas(canvas);
    expect(result).toBeInstanceOf(Array);
    result.forEach(lap => {
      expect(lap).toBeInstanceOf(Lap);
    });
  });
});