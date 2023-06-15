const express = require('express');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');


const app = express();
const port = 3001;

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(cors({
  origin: ['http://localhost:5173'],
}));

app.get('/', (req, res) => {
  res.send('All aboard the Manhattan Express! This is a POC for Egen GPTJam. Team: Project Manhattan.');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/', async (req, res) => {
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      messages: [{role: 'user', content: 'Hello world'}],
    })

    res.status(200).json({resp: chatCompletion.data.choices[0]});
  } catch (error) {
    if (error.response) {
      console.warn('ERROR');
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json({error: error.response.data});
    } else {
      console.error(`ERROR with OpenAI API request: ${error.message}`);
      res.status(500).json({error: {message: 'An error occured'}})
    }
  }
});