import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation if using React Router
import './LandingPage.css'; // Import the CSS file for LandingPage
const LandingPage = () => {
  // Use useEffect to load external scripts
  useEffect(() => {
    // Load Binance Widget script
    const binanceScript = document.createElement('script');
    binanceScript.src = 'https://public.bnbstatic.com/unpkg/growth-widget/cryptoCurrencyWidget@0.0.13.min.js';
    binanceScript.async = true;
    document.body.appendChild(binanceScript);

    // Load CoinGecko Widget script
    const coingeckoScript = document.createElement('script');
    coingeckoScript.src = 'https://widgets.coingecko.com/gecko-coin-price-chart-widget.js';
    coingeckoScript.async = true;
    document.body.appendChild(coingeckoScript);

    return () => {
      // Clean up scripts
      document.body.removeChild(binanceScript);
      document.body.removeChild(coingeckoScript);
    };
  }, []);

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Crypto Portfolio Tracker</h1>
        <p>Track and manage your cryptocurrency investments effortlessly.</p>
        <Link to="/tracker" className="cta-button">Start Tracking</Link> {/* Link to your tracker page */}
      </header>

      <section className="features-section">
        <h2>Features</h2>
        <ul>
          <li className="feature-item">Real-time tracking of ETH, MATIC, and BNB</li>
          <li className="feature-item">Historical data insights</li>
          <li className="feature-item">User-friendly interface</li>
        </ul>
      </section>
      
      {/* Binance Widget Container */}
      <section className="widget-section">
        <div className="binance-widget-container">
          <div className="binance-widget-marquee" 
               data-cmc-ids="1,1027,1839,5426,3408,52,74,5805,3890,7083,11419,5994" 
               data-theme="dark" 
               data-transparent="false" 
               data-powered-by="Powered by" 
               data-disclaimer="Disclaimer"></div>
        </div>
      </section>

      {/* CoinGecko Widget */}
      <section className="widget-section">
        <gecko-coin-price-chart-widget locale="en" outlined="true" initial-currency="usd"></gecko-coin-price-chart-widget>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2024 Crypto Portfolio Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
