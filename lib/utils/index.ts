export function getYearsBefore(years: number): string {
  const d = new Date();
  return `${d.getMonth()}-${d.getDate()}-${d.getFullYear() - years}`;
}

export const colorValidator =
  (v: string): boolean => /^#([0-9a-f]{3}){1,2}$/i.test(v);
// export const passwordRegExp =
// new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")

export function distance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: 'K' | 'M' | 'N',
): number {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
      dist = dist * 1.609344;
    }
    if (unit === 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

export function objectMap<T>(obj: T,
  fn: (v: unknown, k: unknown, i: unknown) => unknown)
  : Record<string, unknown> {
  return Object
    .fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));
}
