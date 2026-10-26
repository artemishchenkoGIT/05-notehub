import { useEffect } from 'react';
import { showError } from '../../utils/error';

interface ErrorMessageProps {
  error: Error;
}

function ErrorMessage({ error }: ErrorMessageProps) {
  useEffect(() => {
    showError(error);
  }, [error]);

  return null;
}

export default ErrorMessage;
