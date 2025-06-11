import express from "express";
import routes from "./routes";
const cors = require('cors');

const app = express();
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use("/api", routes);

export default app;
