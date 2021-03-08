import express from 'express';
import routes from './src/routes';
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use('/', routes);

app.listen(8000, () => {
    console.log('The application is listening on port 8000!');
});