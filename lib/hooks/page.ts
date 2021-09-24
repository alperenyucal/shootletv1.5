import { PageHeaderProps } from 'antd';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from 'react';

interface HeaderProps extends PageHeaderProps {
  show?: boolean;
}
interface FooterProps {
  show?: boolean;
}
interface NavbarProps {
  show?: boolean;
}

interface PageState {
  //page?: any;
  navbar?: NavbarProps;
  header?: HeaderProps;
  footer?: FooterProps;
  loading?: boolean;
}

interface ContextProps {
  setPageState?: Dispatch<SetStateAction<PageState>>;
}

export const defaultPageState: PageState = {
  navbar: { show: true },
  header: { show: true },
  footer: { show: true },
  //page: {},
  loading: false,
};

export const PageContext = createContext<ContextProps>({
  setPageState: undefined,
});

export function usePage(pageState: PageState): void {
  const { setPageState } = useContext(PageContext);

  useEffect(() => {
    if (setPageState)
      setPageState({
        //page: { ...defaultPageState.page, ...pageState.page },
        navbar: { ...defaultPageState.navbar, ...pageState.navbar },
        header: { ...defaultPageState.header, ...pageState.header },
        footer: { ...defaultPageState.footer, ...pageState.footer },
      });
  }, [setPageState]);
}
