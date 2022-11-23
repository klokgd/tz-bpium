import express from "express";
import {statusRoute} from "./routes/statusRoutes.js";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use("/", statusRoute);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})



