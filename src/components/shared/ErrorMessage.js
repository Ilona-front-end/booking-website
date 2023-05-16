import React from 'react';
import { FaRegMeh } from 'react-icons/fa';

const ErrorMessage = ({ errorText }) => {
  return (
    <div className="py-8 px-4 shadow max-w-[400px] mx-auto md:w-[400px] lg:w-[400px] my-4 rounded-md bg-red-50">
      <div className="flex">
        <FaRegMeh size={20} color="#991B1E" />
        <h3 className="ml-2 text-sm font-medium text-red-800">
          Caution! Something went wrong:
        </h3>
      </div>
      <div className="mt-2 text-sm text-red-700">
        <div className="overflow-hidden">
          <div className="break-words">{errorText}</div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
