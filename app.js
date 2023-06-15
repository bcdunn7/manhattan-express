const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(cors({
  origin: ['http://localhost:5173'],
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('All aboard the Manhattan Express! This is a POC for Egen GPTJam. Team: Project Manhattan.');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/', (req, res) => {
  res.json({resp: "Got a POST request"});
});