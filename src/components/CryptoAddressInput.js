import React, { useState } from 'react';
import './CryptoAddressInput.css'; // Ensure this path is correct

const CryptoAddressInput = ({ onSubmit }) => {
  const [address, setAddress] = useState('');

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address) {
      onSubmit(address);
      setAddress(''); // Clear the input field after submission
    }
  };

  return (
    <div className="crypto-address-input-container">
      <h2>Enter Your Cryptocurrency Address</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={handleChange}
          placeholder="Enter your crypto address"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CryptoAddressInput;
