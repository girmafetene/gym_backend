import "reflect-metadata";
import initializeServer from "./config/server";
import app from "./app";

initializeServer().then((server) => {
    server.use(app);
});