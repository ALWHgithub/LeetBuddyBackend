const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')
const app = express();
const db = require('./services/db')
const leetcodeRoutes = require('./routes/leetcodeRoutes');



let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use('/leetcode', leetcodeRoutes);



app.post('/solved',urlencodedParser, async (req, res) => {
  const receivedData = req.body;
  const username = receivedData.username
  const url = 'https://leetcode.com/graphql?query=query%20{%20recentAcSubmissionList(username:%20%20%22'+ username +'%22,%20limit:%201000)%20{%20id%20title%20}%20}';
  axios.get(url)
  .then(response => {
        res.send(response.data)
    })
  
  });

app.post('/create',urlencodedParser, async (req, res) => {
  db.insertSingle(req.body)
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});