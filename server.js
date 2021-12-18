const { express, database } = require("./config");
const { PORT } = require("./constants");

const startServer = () => {
  const server = express();

  server.listen(PORT, () => {
    database();
    console.log(`Server is running on port ${PORT}`);
  }).on("error", () => process.exit(1));
}

startServer();