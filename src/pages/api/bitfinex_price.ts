import { NextApiRequest, NextApiResponse } from 'next';
import { httpGet } from '@/utils/http.util';

export default async function getBitfinexPrice(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await httpGet(
    'https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD'
  );
  res.json(result);
}
