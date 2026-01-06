import express from "express";
import routes from "../routes/index.js";

const app = express();

app.use(express.json());
app.use("/smarthub_householder", routes);

export default app;
