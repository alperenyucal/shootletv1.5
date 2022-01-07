import { useLayout } from '../src/hooks/layout';

export default function Error404(): null {
  useLayout({
    navbar: { transparent: true },
    header: { title: '404 Error :(' },
  });
  return null;
}
