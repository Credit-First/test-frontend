import { useState } from 'react';
import Decimal from 'decimal.js-light';

Decimal.set({
  precision: 20,
  rounding: Decimal.ROUND_HALF_UP,
  toExpNeg: -7,
  toExpPos: 21,
});

export const useFindTicker = () => {
  const [data, setData] = useState('');

  const [timestamp, setTimestamp] = useState('');

  const [error, setError] = useState([{}]);

  return {
    data,
    timestamp,
    error,
    getPrice: async () => {
      try {
        // Fetch ticker data from Bitstamp API
        const response_bitstamp: any = await fetch('/api/bitstamp_price');

        const response_bitfinex: any = await fetch('/api/bitfinex_price');

        const response_coinbase: any = await fetch('/api/coinbase_price');

        const res_bitstamp = await response_bitstamp.json();
        const res_bitfinex = await response_bitfinex.json();
        const res_coinbase = await response_coinbase.json();

        // Set ticker data to state
        const bitstamp_value = new Decimal(res_bitstamp.last);
        const bitfinex_value = new Decimal(res_bitfinex[0][1]);
        const coinbase_value = new Decimal(res_coinbase.data.rates.USD);

        const sumValue = bitstamp_value
          .plus(bitfinex_value)
          .plus(coinbase_value);
        const averageValue = sumValue.dividedBy(3).toFixed(5);

        setTimestamp(res_bitstamp.timestamp);
        setData(averageValue.toString());

        // IF any errors, set error to state
        // setError(errors);

        return;
      } catch (e) {
        console.error(e);
      }
    },
  };
};
