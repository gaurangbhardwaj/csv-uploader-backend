import APP from "express";
import DBConnection from "./config/dbConnection";
import Utils from "./app/utils";
import Config from "./config";
import routes from "./routes";
import { httpConstants } from "./app/common/constants";

const app = new APP();
require("./config/express")(app);
global.lhtWebLog = Utils.lhtLog;

class Server {
  static listen() {
    Promise.all([DBConnection.connect()])
      .then(() => {
        app.listen(Config.PORT);
        Utils.logger(
          "listen",
          `Server Started on port ${Config.PORT}`,
          {},
          "Gaurang",
          httpConstants.LOG_LEVEL_TYPE.INFO
        );
        routes(app);
      })
      .catch((error) =>
        Utils.logger(
          "listen",
          "failed to connect",
          { err: error },
          "Gaurang",
          httpConstants.LOG_LEVEL_TYPE.ERROR
        )
      );
  }
}

Server.listen();
