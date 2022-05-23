// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { httpGet } from '@/utils/http.util';

export default async function getBitstampPrice(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await httpGet(
    'https://www.bitstamp.net/api/v2/ticker/btcusd/'
  );
  res.json(result);
}
