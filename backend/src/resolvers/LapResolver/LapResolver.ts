import { Resolver, Query, Arg, Authorized } from "type-graphql";
import Lap from "../../models/Lap/Lap";
import CanvasInput from "../../types/CanvasInput";


@Resolver()
class LapResolver {

  @Query(_returns => [Lap])
  async lapsByCanvas(
    @Arg("canvas") canvas: CanvasInput
  ): Promise<Lap[]> {
    try {
      const laps: Lap[] = await Lap.findByCanvas(canvas);
      return laps;
    } catch (_error) {
        throw new Error('Internal server error');
    };
  };

  @Query(_returns => [Lap])
  async lapsByCity(
    @Arg("city") city: string
  ): Promise<Lap[]> {
    try {
      const laps: Lap[] = await Lap.findByCity(city);
      return laps;
    } catch (_error) {
        throw new Error('Internal server error');
    };
  };

  @Query(_returns => Lap)
  async lapById(@Arg("id") id: number): Promise<Lap> {
    try {
      const lap: Lap = await Lap.findOneByOrFail({ id });
      return lap;
    } catch(_error) {
        throw new Error('Internal server error');
    };
  };
};

export default LapResolver;