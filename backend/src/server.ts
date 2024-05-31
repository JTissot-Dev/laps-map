import app from ".";
import appDataSource from "./database/AppDataSource";
import startApolloServer from "./startApolloServer";
import LapResolver from "./resolvers/LapResolver/LapResolver";
import UserResolver from "./resolvers/UserResolver/UserResolver";

const port = 4000;

startApolloServer([
  LapResolver,
  UserResolver
], app);

app.listen(port, async () => {
  await appDataSource.initialize();
  console.log(`laps-map app listening on port ${port}`)
});