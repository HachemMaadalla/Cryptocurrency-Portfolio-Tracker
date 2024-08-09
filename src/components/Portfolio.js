import React, { useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [address, setAddress] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/portfolio/get-data', { address });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste your crypto wallet address here"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Get Data</button>
      </form>
      <div>
        <h2>Results:</h2>
        <ul>
          {data.map((coin) => (
            <li key={coin.id}>
              {coin.name}: ${coin.current_price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Portfolio;
