import { InputType, Field } from "type-graphql";

@InputType()
class CanvasInput {
  @Field(_type => String)
  northWest: string;

  @Field(_type => String)
  northEst: string;

  @Field(_type => String)
  southEst: string;

  @Field(_type => String)
  southWest: string;
};

export default CanvasInput;