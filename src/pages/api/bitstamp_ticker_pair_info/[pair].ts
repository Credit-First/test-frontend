import { httpGet } from '@/utils/http.util';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getTickerPairInfo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { pair } = req.query as { pair: string };
    const result = await httpGet(
      `https://www.bitstamp.net/api/v2/ticker/${pair}`
    );
    res.json(result);
  } catch (e) {
    res.status(400);
  }
}
