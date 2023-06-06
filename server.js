require('dotenv').config()
const apiKey = process.env.API_KEY
const express = require('express')
const app = express()
app.use(express.static('public'));
const port = 3000

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

const axios = require('axios');

app.get('/api/data', async (req, res) => {
  const query = req.query.query;
  try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`)
      res.json(response.data)
  } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'An error occurred' })
  }
});