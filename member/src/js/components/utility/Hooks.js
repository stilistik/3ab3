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
export const useTimeout = (callback, timeout, deps = []) => {
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
  }, [callback, timeout, cancel, ...deps]);

  return cancel;
};

const POLLING_SETTINGS = [
  { interval: 5 * 1000, timeout: 30 * 1000 }, // every 5s for 30sec
  { interval: 10 * 1000, timeout: 60 * 1000 }, // every 10s fro 1min
  { interval: 30 * 1000, timeout: 5 * 60 * 1000 }, // every 30s for 5min
  { interval: 1 * 60 * 1000, timeout: 5 * 60 * 1000 }, // every 1min for 5min
  { interval: 5 * 60 * 1000, timeout: 10 * 60 * 1000 }, // every 5min for 10min
  { interval: 10 * 60 * 1000, timeout: 10 * 60 * 1000 }, // every 10min for 10min
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
    return () => {
      if (ref.current) observer.current.unobserve(ref.current);
    };
  }, []);
};

/**
 * Returns a function that can be called to force a function component
 * to re-render.
 */
export const useForceUpdate = () => {
  const setValue = React.useState(0)[1];
  return () => setValue((value) => ++value);
};

/**
 * Adds an event listener to an element on mount and removes it on unmount
 * @param {ref} element an html elemen ref to add an event listener to
 * @param {string} event the event to listen for
 * @param {function} callback the function to call on event
 * @param {array<any>} deps: the hook deps triggering registering of a new event handler
 */
export const useEventListener = (element, event, callback, deps) => {
  React.useEffect(() => {
    element.addEventListener(event, callback);
    return () => element.removeEventListener(event, callback);
  }, deps);
};

export const useDebounce = (callback, timeout) => {
  const timerRef = React.useRef(null);

  const wrappedCallback = (...args) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => callback(...args), timeout);
  };

  return wrappedCallback;
};
