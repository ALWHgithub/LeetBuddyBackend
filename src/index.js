const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')
const app = express();



var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.post('/',urlencodedParser, (req, res) => {
    const receivedData = req.body; // Extract the data from the request body
    console.log(receivedData);

    axios.get('https://leetcode.com/graphql?query={%20question(titleSlug:%20%22two-sum%22)%20{%20questionId%20questionFrontendId%20title%20titleSlug%20isPaidOnly%20difficulty%20likes%20dislikes%20}%20}')
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        res.status(500).json({ error: 'An error occurred while fetching data from LeetCode API.' });
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});