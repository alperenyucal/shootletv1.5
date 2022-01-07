import { useContext, useEffect } from 'react';
import {
  defaultLayoutState,
  LayoutContext,
  LayoutState,
} from '../../components/Layout/LayoutContext';

export function useLayout(layoutState: LayoutState): void {
  const { setLayoutState } = useContext(LayoutContext);

  useEffect(() => {
    if (setLayoutState) {
      setLayoutState({
        navbar: { ...defaultLayoutState.navbar, ...layoutState.navbar },
        header: { ...defaultLayoutState.header, ...layoutState.header },
        footer: { ...defaultLayoutState.footer, ...layoutState.footer },
        loading: layoutState.loading,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
