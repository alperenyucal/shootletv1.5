import { NextApiRequest } from 'next';

export const parseUrlParams = (req: NextApiRequest) => {
  if (req.url?.includes('?')) {
    const params = req.url.split('?')[1].split('&');
    return Object.fromEntries(
      params.map((x) => {
        const splitArr: (string | number)[] = x.split('=');
        if (/^-?\d+$/.test(splitArr[1] as string)) {
          splitArr[1] = Number(splitArr[1]);
        }
        return splitArr;
      }),
    );
  }
  return null;
};
