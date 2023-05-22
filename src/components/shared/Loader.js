import React from 'react';
import Spinner from 'react-svg-spinner';

function LoaderCircle() {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* https://chantastic.github.io/react-svg-spinner */}
      <Spinner size="80px" color="green" thickness={3} gap={5} speed="slow" />
    </div>
  );
}

export default LoaderCircle;
