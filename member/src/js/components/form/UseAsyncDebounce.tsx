import React from 'react';

interface IDebounceRef {
  defaultFn?: (args: any[]) => void;
  defaultWait?: number;
  promise?: Promise<any>;
  resolve?: (value?: any) => void;
  reject?: (value?: any) => void;
  timeout?: ReturnType<typeof setTimeout>;
}

export const useAsyncDebounce = (
  defaultFn?: (args: any[]) => void,
  defaultWait = 0
): ((fn?: any, wait?: any) => Promise<any>) => {
  const debounceRef = React.useRef<IDebounceRef>({});
  debounceRef.current.defaultFn = defaultFn;
  debounceRef.current.defaultWait = defaultWait;

  const debounce = React.useCallback(
    async (fn = debounceRef.current.defaultFn, wait = debounceRef.current.defaultWait) => {
      if (!debounceRef.current.promise) {
        debounceRef.current.promise = new Promise((resolve, reject) => {
          debounceRef.current.resolve = resolve;
          debounceRef.current.reject = reject;
        });
      }

      if (debounceRef.current.timeout) {
        clearTimeout(debounceRef.current.timeout);
      }

      debounceRef.current.timeout = setTimeout(async () => {
        delete debounceRef.current.timeout;
        try {
          debounceRef.current.resolve(await fn());
        } catch (err) {
          debounceRef.current.reject(err);
        } finally {
          delete debounceRef.current.promise;
          delete debounceRef.current.resolve;
          delete debounceRef.current.reject;
        }
      }, wait);

      return debounceRef.current.promise;
    },
    []
  );

  return debounce;
};
