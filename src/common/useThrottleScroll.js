// common/useThrottleScroll.js
import { useEffect } from 'react';
import throttle from './throttle';

/**
 * Custom hook to handle throttled scroll events.
 * 
 * @param {function} callback - The callback function to execute on scroll.
 * @param {number} limit - The time limit in milliseconds for throttling.
 */
const useThrottleScroll = (callback, limit) => {
  useEffect(() => {
    const handleScroll = throttle(callback, limit);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback, limit]);
};

export default useThrottleScroll;
