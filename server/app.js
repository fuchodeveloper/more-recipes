import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use(require('./routes'));

// app.listen(3000, () => {
// });

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, () => {
  console.log('listening...');
});

// module.exports = app;
export default app;
