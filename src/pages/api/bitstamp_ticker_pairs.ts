import { httpGet } from '@/utils/http.util';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getTickerPairs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await httpGet(
    'https://www.bitstamp.net/api/v2/trading-pairs-info/'
  );
  res.json(result);
}
