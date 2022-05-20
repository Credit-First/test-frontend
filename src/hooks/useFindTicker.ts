import { useState } from 'react';

const COINBASE_BASE_URL = 'https://api.coinbase.com/v2';

export const useFindTicker = () => {
  // Holds value for search form
  const [symbol, setSymbol] = useState('');

  // Holds data value of cryptocurrency market data
  const [data, setData] = useState(null);

  // Holds error messages from Coinbase API
  const [error, setError] = useState([{}]);

  return {
    setSymbol,
    data,
    error,
    getTodayPrice: async () => {
      try {
        // No need to make a request if symbol value is empty.
        if (symbol.trim().length < 1) {
          setError([
            { message: 'Enter a symbol and fiat currency. e.g - BTC-USD' },
          ]);
          return;
        }

        // Fetch ticker data from Coinbase API
        const res = await fetch(
          `${COINBASE_BASE_URL}/prices/${symbol.trim()}/buy`
        );
        const { errors, data } = await res.json();

        // IF any errors, set error to state
        setError(errors);

        // Set ticker data to state
        setData(data);
        return;
      } catch (e) {
        console.error(e);
      }
    },
  };
};
