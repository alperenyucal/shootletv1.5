import { NextApiRequest } from 'next';

export default function parseUrlParams(req: NextApiRequest): any {
  if (req.url?.includes('?')) {
    const params = req.url.split('?')[1].split('&');
    return Object.fromEntries(
      params.map((x) => {
        const splitArr: any[] = x.split('=');
        if (!isNaN(splitArr[1])) splitArr[1] = Number(splitArr[1]);
        return splitArr;
      }),
    );
  }
  return null;
}
