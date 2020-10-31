import React from 'react';

export function useMedia<T extends any>(
  queries: string[],
  values: T[],
  defaultValue: T
) {
  const match = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] || defaultValue;
  const [value, set] = React.useState(match);
  React.useEffect(() => {
    const handler = () => set(match);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return value;
}
