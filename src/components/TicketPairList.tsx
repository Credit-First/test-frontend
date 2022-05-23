import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { httpGet } from '@/utils/http.util';
import { GJNumberView } from '@/components/GJNumberView';

type pairProps = {
  trading: string;
  base_decimals: string;
  url_symbol: string;
  name: string;
  instant_and_market_orders: string;
  minimum_order: string;
  counter_decimals: string;
  description: string;
};

const TickerPairList = () => {
  const [selectedPair, setSelectedPair] = useState('');
  const [pairData, setPairData] = useState();
  const [tickerPairList, setTickerPairList] = useState([]);

  const handleSelectPair = (name: string) => async () => {
    setSelectedPair(name);

    const res = await httpGet(`/api/bitstamp_ticker_pair_info/${name}`);

    setPairData(res);
  };

  useEffect(() => {
    httpGet('/api/bitstamp_ticker_pairs').then(res => setTickerPairList(res));
  }, []);

  return (
    <div className='flex flex-col items-start justify-center'>
      <div className='w-full rounded-xl bg-zinc-800 p-2 max-h-[400px] overflow-y-scroll'>
        {tickerPairList.length === 0 ? <>No pairs</> : (
          <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2'>
            {tickerPairList.map((item: pairProps, key: number) => (
              <button
                key={key}
                className={clsx(
                  'rounded-lg p-2 hover:bg-zinc-600',
                  selectedPair === item.name
                    ? 'bg-zinc-400 text-white'
                    : ' bg-zinc-700'
                )}
                onClick={handleSelectPair(item.url_symbol)}
              >
                {item.name}
              </button>
            ))}
          </div>)}
      </div>
      <div className='mt-12 flex min-h-[300px] w-full flex-1 items-center justify-center rounded-xl bg-zinc-800 p-2'>
        <GJNumberView pairData={pairData} />
      </div>
    </div>
  );
};

export default TickerPairList;


