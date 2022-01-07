import { PageHeaderProps as HeaderProps } from 'antd';
import { createContext, Dispatch, SetStateAction } from 'react';
import { NavbarProps } from '.';

interface GenericProps {
  show?: boolean;
}

export interface LayoutState {
  navbar?: NavbarProps & GenericProps;
  header?: HeaderProps & GenericProps;
  footer?: GenericProps;
  loading?: boolean & GenericProps;
}

interface ContextProps {
  setLayoutState: Dispatch<SetStateAction<LayoutState>>;
}

export const defaultLayoutState: LayoutState = {
  navbar: { show: true },
  header: { show: true },
  footer: { show: true },
  loading: false,
};

export const LayoutContext = createContext<ContextProps>({
  setLayoutState: () => undefined,
});
