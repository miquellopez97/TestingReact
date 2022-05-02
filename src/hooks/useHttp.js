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

      await wait(2000);

      if (response.status !== 400) {
        const data = await response.json();
  
        console.log(data.body);
  
        manageData(data);
        return (true);
      } else {
        throw new Error('Status: ' + response.status);
      }

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