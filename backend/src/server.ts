import app from ".";
import appDataSource from "./database/appDataSource";
import startApolloServer from "./startApolloServer";
import LapResolver from "./resolvers/LapResolver/LapResolver";

const port = 4000;

startApolloServer([
  LapResolver
], app);

app.listen(port, async () => {
  await appDataSource.initialize();
  console.log(`laps-map app listening on port ${port}`)
});