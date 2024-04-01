import app from ".";
import appDataSource from "./database/appDataSource";

const port = 4000;

app.listen(port, async () => {
  await appDataSource.initialize();
  console.log(`laps-map app listening on port ${port}`)
});