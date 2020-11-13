import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const useMeasure = (): [
  React.MutableRefObject<HTMLDivElement>,
  Bounds
] => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [bounds, set] = React.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [ro] = React.useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  React.useEffect(() => {
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, bounds];
};
