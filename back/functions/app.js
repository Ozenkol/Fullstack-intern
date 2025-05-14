// const express = require("express");
// const serverless = require("serverless-http");
// const app = express();
// const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("App is running..");
// });

// module.exports.handler = serverless(app);

'use strict';

const serverless = require("serverless-http");
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const router = express.Router();
require('dotenv').config();


const app = express();
const port = 3001;

const API_KEY = process.env.OPENAI_API_KEY

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true)
    next();
});


router.get('/', async (req, res, next) => {
  res.json('OKK')
})

router.post('/', async (req, res, next) => {
    res.json('Hello')
}) 

router.post('/send-message', async (req, res, next) => {
  const userMessage = req.body;

  // Replace with your actual OpenAI API key
  const OPENAI_API_KEY = API_KEY;

  // Send a user message using the OpenAI API to receive a response
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: userMessage}],
        max_tokens: 100
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
  
    const gptMessage = response.data.choices[0].message.content;
  
    // Return the message created by GPT to the React frontend
    res.json({ message: gptMessage });
  } catch(error) {
    console.error('Error with OpenAI API:', error.message);
    res.status(500).json({ error: 'Failed to fetch response from OpenAI', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/.netlify/functions/app", router);

module.exports.handler = serverless(app);