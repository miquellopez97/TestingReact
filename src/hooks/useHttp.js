import { useState, useCallback } from 'react';
import wait from '../helpers/wait';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, manageData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        headers:  {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(requestConfig.body),
      });
      if (!response.ok) {
        throw new Error('Request failed!');
      }
      const data = await response.json();

      await wait(2000);

      console.log(data);

      manageData(data);
    } catch(err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
}
export default useHttp;