import React from 'react';

export const useClickAway = (
  ref: React.MutableRefObject<HTMLElement>,
  callback: () => void
) => {
  React.useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [callback]);
};
