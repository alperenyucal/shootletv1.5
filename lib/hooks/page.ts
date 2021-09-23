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

interface IPageState {
  page?: any;
  navbar?: NavbarProps;
  header?: HeaderProps;
  footer?: FooterProps;
  loading?: boolean;
}

interface IContextProps {
  setPageState?: Dispatch<SetStateAction<IPageState>>;
}

export const defaultPageState: IPageState = {
  navbar: { show: true },
  header: { show: true },
  footer: { show: true },
  page: {},
  loading: false,
};

export const PageContext = createContext<IContextProps>({
  setPageState: undefined,
});

export function usePage(pageState: IPageState): void {
  const { setPageState } = useContext(PageContext);

  useEffect(() => {
    if (setPageState)
      setPageState({
        page: { ...defaultPageState.page, ...pageState.page },
        navbar: { ...defaultPageState.navbar, ...pageState.navbar },
        header: { ...defaultPageState.header, ...pageState.header },
        footer: { ...defaultPageState.footer, ...pageState.footer },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPageState]);
}
