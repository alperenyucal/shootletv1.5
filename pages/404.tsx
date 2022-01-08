import { useLayout } from '../lib/hooks/layout';

export default function Error404(): null {
  useLayout({
    navbar: { transparent: true },
    header: { title: '404 Error :(' },
    footer: { show: false },
  });
  return null;
}
