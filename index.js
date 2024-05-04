import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import router from "./router/router.js";

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("assets"));

app.use("/", router);

app.listen(PORT, ()=> console.log(`servidor iniciado en http://localhost:${PORT}`))