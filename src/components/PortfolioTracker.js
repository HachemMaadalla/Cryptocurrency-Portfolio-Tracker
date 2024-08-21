import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import CryptoAddressInput from './CryptoAddressInput';
import PieChart from './PieChart'; // Import the PieChart component
import axios from 'axios';

const PortfolioTracker = () => {
  const [ethBalance, setEthBalance] = useState(null);
  const [maticBalance, setMaticBalance] = useState(null);
  const [bnbBalance, setBnbBalance] = useState(null);
  const [ethValue, setEthValue] = useState(null);
  const [maticValue, setMaticValue] = useState(null);
  const [bnbValue, setBnbValue] = useState(null);
  const [historicalValues, setHistoricalValues] = useState({
    day: null,
    week: null,
    month: null,
  });
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTimer, setRefreshTimer] = useState(0); // Timer state

  const API_KEY = 'YOUR_CRYPTOCOMPARE_API_KEY'; // Replace with your CryptoCompare API key

  const fetchPriceInUSD = async (symbol) => {
    try {
      const response = await axios.get(`https://min-api.cryptocompare.com/data/price`, {
        params: {
          fsym: symbol,
          tsyms: 'USD',
          api_key: API_KEY,
        },
      });
      return response.data.USD || 0;
    } catch (error) {
      console.error(`Error fetching ${symbol} price:`, error);
      return 0;
    }
  };
  
  const fetchHistoricalPriceInUSD = async (symbol, days) => {
    try {
      const response = await axios.get(`https://min-api.cryptocompare.com/data/v2/histoday`, {
        params: {
          fsym: symbol,
          tsym: 'USD',
          limit: days,
          api_key: API_KEY,
        },
      });
      const prices = response.data.Data?.Data || [];
      return prices.length > 0 ? prices[0].close : 0;
    } catch (error) {
      console.error(`Error fetching ${symbol} historical price for ${days} days:`, error);
      return 0;
    }
  };
  

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const handleAddressSubmit = async (address) => {
    setAddress(address); // Set address to state
    await refreshData(address);
  };

  const refreshData = async (address) => {
    setRefreshing(true);

    // Clear previous data
    setEthBalance(null);
    setMaticBalance(null);
    setBnbBalance(null);
    setEthValue(null);
    setMaticValue(null);
    setBnbValue(null);

    console.log('Fetching data for address:', address);
    const ethPriceInUSD_1d = await fetchHistoricalPriceInUSD('ETH', 1);
      const ethPriceInUSD_1w = await fetchHistoricalPriceInUSD('ETH', 7);
      const ethPriceInUSD_1m = await fetchHistoricalPriceInUSD('ETH', 30);

      const maticPriceInUSD_1d = await fetchHistoricalPriceInUSD('MATIC', 1);
      const maticPriceInUSD_1w = await fetchHistoricalPriceInUSD('MATIC', 7);
      const maticPriceInUSD_1m = await fetchHistoricalPriceInUSD('MATIC', 30);

      const bnbPriceInUSD_1d = await fetchHistoricalPriceInUSD('BNB', 1);
      const bnbPriceInUSD_1w = await fetchHistoricalPriceInUSD('BNB', 7);
      const bnbPriceInUSD_1m = await fetchHistoricalPriceInUSD('BNB', 30);
    try {
      // Etherscan API for ETH
      const ethResponse = await axios.get('https://api.etherscan.io/api', {
        params: {
          module: 'account',
          action: 'balance',
          address: address,
          tag: 'latest',
          apikey: 'HWY5S8DSE41C5GJ4KRD7WDUQM199MQ28SB',
        },
      });
      await delay(1000);
      if (ethResponse.data && ethResponse.data.result) {
        const ethBalanceInEth = ethResponse.data.result / 1e18; // Convert Wei to ETH
        setEthBalance(ethBalanceInEth);

        // Fetch ETH price in USD
        const ethPriceInUSD = await fetchPriceInUSD('ETH');
        setEthValue(ethBalanceInEth * ethPriceInUSD);
      } else {
        setError('No ETH data found for the provided address.');
        setEthBalance(null);
        setEthValue(null);
      }

      // Polygon API for MATIC
      const maticResponse = await axios.get('https://api.polygonscan.com/api', {
        params: {
          module: 'account',
          action: 'balance',
          address: address,
          tag: 'latest',
          apikey: '3F4IMSFCKVM548P23U9Q12GQ9HXEQKGREI',
        },
      });
      await delay(1000);
      if (maticResponse.data && maticResponse.data.result) {
        const maticBalanceInMatic = maticResponse.data.result / 1e18; // Convert Wei to MATIC
        setMaticBalance(maticBalanceInMatic);

        // Fetch MATIC price in USD
        const maticPriceInUSD = await fetchPriceInUSD('MATIC');
        setMaticValue(maticBalanceInMatic * maticPriceInUSD);
      } else {
        setError('No MATIC data found for the provided address.');
        setMaticBalance(null);
        setMaticValue(null);
      }

      // BscScan API for BNB
      const bnbResponse = await axios.get('https://api.bscscan.com/api', {
        params: {
          module: 'account',
          action: 'balance',
          address: address,
          tag: 'latest',
          apikey: 'K8YY5VUW6X9YPUXHSD2JP3A1Q2214DD1C7',
        },
      });
      await delay(1000);
      if (bnbResponse.data && bnbResponse.data.result) {
        const bnbBalanceInBnb = bnbResponse.data.result / 1e18; // Convert Wei to BNB
        setBnbBalance(bnbBalanceInBnb);

        // Fetch BNB price in USD
        const bnbPriceInUSD = await fetchPriceInUSD('BNB');
        setBnbValue(bnbBalanceInBnb * bnbPriceInUSD);
      } else {
        setError('No BNB data found for the provided address.');
        setBnbBalance(null);
        setBnbValue(null);
      }

      // Fetch historical prices

      // Calculate historical portfolio values
      const totalValue_1d = (ethBalance * ethPriceInUSD_1d) + (maticBalance * maticPriceInUSD_1d) + (bnbBalance * bnbPriceInUSD_1d);
      const totalValue_1w = (ethBalance * ethPriceInUSD_1w) + (maticBalance * maticPriceInUSD_1w) + (bnbBalance * bnbPriceInUSD_1w);
      const totalValue_1m = (ethBalance * ethPriceInUSD_1m) + (maticBalance * maticPriceInUSD_1m) + (bnbBalance * bnbPriceInUSD_1m);

      setHistoricalValues({
        day: totalValue_1d,
        week: totalValue_1w,
        month: totalValue_1m,
      });

      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error.response || error.message || error);
      setError('Error fetching data. Please try again.');
      setEthBalance(null);
      setMaticBalance(null);
      setBnbBalance(null);
      setEthValue(null);
      setMaticValue(null);
      setBnbValue(null);
      setHistoricalValues({
        day: null,
        week: null,
        month: null,
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    if (address) {
      setRefreshTimer(1); // Set timer to 1 seconds
      const interval = setInterval(() => {
        setRefreshTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            refreshData(address); // Refresh data when the timer hits 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  // Calculate total portfolio value
  const totalValue = (ethValue || 0) + (maticValue || 0) + (bnbValue || 0);

  return (
    <div>
      <main>
        <div className="container">
          {/* Home Button and Address Text */}
          <div className="home-button-container">
            <Link to="/" className="home-button">Home</Link>
          </div>

          <CryptoAddressInput onSubmit={handleAddressSubmit} />

          {error && <div className="error-message">{error}</div>}

          {address && !refreshing && (
            <button onClick={handleRefresh}>
              Refresh Data {refreshTimer > 0 && `(${refreshTimer}s)`}
            </button>
          )}

          {refreshing && <p>Refreshing data...</p>}

          <div className="balance-container">
            {ethBalance !== null && (
              <div className="balance-item">
                <h2>ETH Balance:</h2>
                <p>{ethBalance} ETH</p>
                <p>Value: ${ethValue?.toFixed(2) || '0.00'}</p>
              </div>
            )}
            {maticBalance !== null && (
              <div className="balance-item">
                <h2>MATIC Balance:</h2>
                <p>{maticBalance} MATIC</p>
                <p>Value: ${maticValue?.toFixed(2) || '0.00'}</p>
              </div>
            )}
            {bnbBalance !== null && (
              <div className="balance-item">
                <h2>BNB Balance:</h2>
                <p>{bnbBalance} BNB</p>
                <p>Value: ${bnbValue?.toFixed(2) || '0.00'}</p>
              </div>
            )}
          </div>
          {historicalValues.day !== null && totalValue > 0 && (
            <div className="historical-chart-container">
            <div className="historical-values">
              <h2>Historical Portfolio Values</h2>
              <h2>Click on Refresh To Display</h2>
              <p>1 Day Ago: ${historicalValues.day.toFixed(2)}</p>
              <p>1 Week Ago: ${historicalValues.week.toFixed(2)}</p>
              <p>1 Month Ago: ${historicalValues.month.toFixed(2)}</p>
            </div>
              <div className="chart-container">
                <PieChart 
                  data={[
                    { label: 'ETH', value: ethValue || 0 },
                    { label: 'MATIC', value: maticValue || 0 },
                    { label: 'BNB', value: bnbValue || 0 },
                  ]}
                />
                <h2>Total Portfolio Value: ${totalValue.toFixed(2)}</h2>
              </div>
            </div>
          )}
          
          {/* CoinGecko Widget */}
          <div className="coin-gecko-widget">
            <script src="https://widgets.coingecko.com/gecko-coin-price-chart-widget.js"></script>
            <gecko-coin-price-chart-widget locale="en" outlined="true" initial-currency="usd"></gecko-coin-price-chart-widget>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioTracker;