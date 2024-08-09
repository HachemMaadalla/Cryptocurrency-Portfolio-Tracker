// src/CryptoCalculatorWidget.js
import React from 'react';

const CryptoCalculatorWidget = () => {
    return (
        <div className="crypto-calculator-widget">
            <iframe
                src="https://www.bitgetwidget.com/widget-tool/cryptocurrency-calculator?theme=white&lang=en&showItems=corners,title"
                width="100%"
                height="580"
                style={{ border: 'none' }}
                title="Cryptocurrency Calculator"
            ></iframe>
        </div>
    );
};

export default CryptoCalculatorWidget;
