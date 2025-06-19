import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
const Toast = ({ message, type = 'error', onClose, duration = 3000 }) => {
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(message);
  }, [message]);
  useEffect(() => {
    const timer = setTimeout(() => setError(false), duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    error && (
      <div className={`fixed top-15 right-5 px-4 py-2 text-white rounded shadow-lg ${bgColor}`}>
        {error}
        <span onClick={() => setError(false)}>
          <CloseIcon className="cursor-pointer text-xs" />
        </span>
      </div>
    )
  );
};

export default Toast;
