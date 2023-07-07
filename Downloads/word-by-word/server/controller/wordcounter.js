const axios = require('axios');
const wordCount = require('word-count');

//to count the word
async function countWordsInWebpage(url) {
  try {
    const response = await axios.get(url);
    const text = response.data;
    const wordCountResult = wordCount(text);
    return wordCountResult;
  } catch (error) {
    console.error('Failed to fetch the webpage:', error.message);
    return "Unavailable";
  }
}

module.exports = countWordsInWebpage; 
