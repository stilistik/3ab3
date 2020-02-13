import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * Calls a function repeatedly
 * @param {function} callback The function to call
 * @param {number} delay The interval in ms
 */
export const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => savedCallback.current();
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

/**
 * Calls a method after a certain amout of time.
 * @param {function} callback The function to call after timeout
 * @param {number} timeout Timeout in ms
 */
export const useTimeout = (callback, timeout) => {
  const timeoutIdRef = React.useRef(null);
  const cancel = React.useCallback(() => {
    const timeoutId = timeoutIdRef.current;
    if (timeoutId) {
      timeoutIdRef.current = undefined;
      clearTimeout(timeoutId);
    }
  }, [timeoutIdRef]);

  React.useEffect(() => {
    timeoutIdRef.current = setTimeout(callback, timeout);
    return cancel;
  }, [callback, timeout, cancel]);

  return cancel;
};

const POLLING_SETTINGS = [
  { interval: 300, timeout: 3000 },
  { interval: 500, timeout: 5000 },
  { interval: 1000, timeout: 5000 },
  { interval: 2000, timeout: 5000 },
  { interval: 5000, timeout: 5000 },
  { interval: 10000, timeout: 10000 },
];

/**
 * Sets up a polling interval to refetch a query.
 * The polling interval will gradually become larger according
 * to the polling settings
 * @param {function} refetch The refetch function of the query
 */
export const usePolling = (refetch) => {
  const [index, setIndex] = React.useState(0);

  const setting = POLLING_SETTINGS[index];

  useInterval(() => {
    refetch();
  }, setting.interval);

  useTimeout(() => {
    if (index < POLLING_SETTINGS.length - 1) setIndex(index + 1);
  }, setting.timeout);
};

/**
 * Prevents double clicks to fire a click handler twice
 * @param {function} onClick A click event handler function that will
 * only be called once when the user double clicks
 */
export const useNoDoubleClick = (onClick) => {
  const blocked = React.useRef(null);

  const handleClick = (params) => {
    if (blocked.current) return;
    else {
      onClick(params);
      blocked.current = true;
      setTimeout(() => {
        blocked.current = false;
      }, 200);
    }
  };

  return handleClick;
};

/**
 * Observes an element for resizing events and notifies a
 * callback function
 * @param {React.ref} ref A ref to the DOM element to observe
 * @param {function} callback The callback function to call onResize
 */
export const useObserveResize = (ref, callback) => {
  const observer = React.useRef(null);
  React.useLayoutEffect(() => {
    observer.current = new ResizeObserver(callback);
    observer.current.observe(ref.current);
    return () => observer.current.unobserve(ref.current);
  }, []);
};

/**
 * Returns a function that can be called to force a function component
 * to re-render.
 */
export const useForceUpdate = () => {
  const [value, setValue] = React.useState(0);
  return () => setValue((value) => ++value);
};
