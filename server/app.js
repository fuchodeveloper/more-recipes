import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use(require('./routes'));

app.listen(3000, () => {
});

// module.exports = app;
export default app;
