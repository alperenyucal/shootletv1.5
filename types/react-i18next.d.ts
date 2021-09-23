import 'react-i18next';
import { resources } from '../locale/setupLocale';

declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {

    resources: typeof resources['en'];
  }
}
