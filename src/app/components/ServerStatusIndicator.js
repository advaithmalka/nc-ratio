import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';

const ServerStatusIndicator = ({ serverUrl }) => {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    const checkServerStatus = async () => {
      try {
        // Reset status to loading
        if (isMounted) setStatus('loading');

        // Set a timeout for the request
        const controller = new AbortController();
        timeoutId = setTimeout(() => controller.abort(), 60000); // 1 minute timeout

        const response = await fetch(serverUrl, {
          method: 'GET',
          signal: controller.signal
        });

        if (isMounted) {
          if (response.ok) {
            setStatus('active');
          } else {
            setStatus('error');
          }
        }
      } catch (error) {
        if (isMounted) {
          // Check if it's a timeout or other error
          if ((error).name === 'AbortError') {
            setStatus('error');
          } else {
            setStatus('error');
          }
        }
      } finally {
        // Clear the timeout
        if (timeoutId) clearTimeout(timeoutId);
      }
    };

    // Initial check
    checkServerStatus();

    // Set up periodic checks (every 30 seconds)
    const intervalId = setInterval(checkServerStatus, 30000);

    // Cleanup function
    return () => {
      isMounted = false;
      clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Detailed status messages
  const statusDetails = {
    active: {
      color: 'limegreen', 
      fullMessage: 'Connected to API'
    },
    loading: {
      color: 'blue', 
      fullMessage: 'Connecting to API'
    },
    error: {
      color: 'red', 
      fullMessage: 'API Unreachable'
    }
  };

  const currentStatus = statusDetails[status];

  return (
    <>
      <div 
        data-tooltip-id="server-status-tooltip"
        data-tooltip-content={currentStatus.fullMessage}
        className="w-3 h-3 rounded-full animate-pulse"
        style={{ 
            backgroundColor: currentStatus.color,
            animationDuration: status === 'loading' ? '5s' : 'none'
        }}
    />

      <Tooltip id="server-status-tooltip"  // Tailwind class to set font size
    style={{ 
        fontSize: '0.75rem',  // Alternative way to set font size
        padding: '0.25rem 0.5rem' // Optional: adjust padding
    }} />
    </>
  );
};

export default ServerStatusIndicator;