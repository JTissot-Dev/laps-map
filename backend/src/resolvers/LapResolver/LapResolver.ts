import { Resolver, Query, Arg } from "type-graphql";
import Lap from "../../models/Lap/Lap";
import CanvasInput from "../../types/CanvasInput";


@Resolver()
class LapResolver {

  @Query(_returns => [Lap])
  async laps(
    @Arg("canvas") canvas: CanvasInput
  ): Promise<Lap[]> {
    try {
      const laps: Lap[] = await Lap.findByCanvas(canvas);
      return laps;
    } catch (error) {
        console.log(error);
        throw new Error('Internal server error');
    };
  };
};

export default LapResolver;