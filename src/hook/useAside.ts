import { useState } from 'react';

export const useAside = () => {
  const [asideIsOpen, setAsideIsOpen] = useState<boolean>(() => {
    const statusString = window.localStorage.getItem('aside-is-open');
    const status = statusString ? JSON.parse(statusString) : null;

    switch (status) {
      case null:
        window.localStorage.setItem(
          'aside-is-open',
          JSON.stringify(true)
        );
        return true;

      case true:
        return true;

      case false:
        return false;

      default:
        window.localStorage.setItem(
          'aside-is-open',
          JSON.stringify(true)
        );
        return true;
    }
  });

  const openAside = () => {
    window.localStorage.setItem(
      'aside-is-open',
      JSON.stringify(true)
    );
    setAsideIsOpen(true);
  };

  const closeAside = () => {
    window.localStorage.setItem(
      'aside-is-open',
      JSON.stringify(false)
    );
    setAsideIsOpen(false);
  };

  return {
    asideIsOpen,
    openAside,
    closeAside,
  };
};
