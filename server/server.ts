import express from "express";
import routes from "./routes/index";

const app = express();
const port = 7000;

routes(app);

app.use(express.static('build'));

app.listen(port, () => {
    console.log(`running at ${port} port`);
});
