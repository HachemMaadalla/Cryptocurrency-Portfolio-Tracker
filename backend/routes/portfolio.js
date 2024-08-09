const express = require('express');
const axios = require('axios');
const router = express.Router();

// Example route to fetch cryptocurrency data
router.post('/get-data', async (req, res) => {
  const { address } = req.body; // assuming you're using address for some kind of lookup

  try {
    // Use CoinGecko API as an example
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: 'bitcoin,ethereum,litecoin', // Example coins
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
      },
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
