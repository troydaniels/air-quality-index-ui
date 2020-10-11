import React, { useEffect } from 'react';
import { useAppState } from '../../state';
import enhancedMessage from './enhancedMessage';

const ERROR_DURATION = 3000; // In ms

const ErrorMessage = () => {
  const { error, setError } = useAppState();

  useEffect(() => {
    // When we get a new error, display it for ERROR_DURATION ms
    if (error) {
      setTimeout(() => {
        setError(null);
      }, ERROR_DURATION);
    }
  }, [error]);

  return error ? (
    <div className="w-100 absolute flex flex-row justify-center f6">
      <div className="ph1 br2 ba b--solid b--gray bg-white gray">
        {enhancedMessage(error)}
      </div>
    </div>
  ) : null;
};

export default ErrorMessage;
