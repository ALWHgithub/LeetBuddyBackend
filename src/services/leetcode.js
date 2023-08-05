const axios = require('axios');

function getDataFromSlug(req, res) {
    // req.body should be of type problem
    const receivedData = req.body;
    console.log(receivedData)
    const slug = receivedData.slug
    const url = 'https://leetcode.com/graphql?query={%20question(titleSlug:%20%22' + slug + '%22)%20{%20questionId%20questionFrontendId%20title%20titleSlug%20isPaidOnly%20difficulty%20likes%20dislikes%20}%20}';
    
    axios.get(url)
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        res.status(500).json({ error: 'An error occurred while fetching data from LeetCode API.' });
    });
}




module.exports = {
    getDataFromSlug,
};