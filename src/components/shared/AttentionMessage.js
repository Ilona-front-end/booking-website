import React from 'react';

const AttentionMessage = ({ heading, text }) => {
  return (
    <div className="py-8 px-4 shadow md:mx-auto md:max-w-[400px] lg:mx-auto lg:max-w-[400px] my-4 rounded-md bg-yellow-50">
      <div className="flex">
        <svg
          class="h-5 w-5 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          />
        </svg>
        <h3 className="ml-2 text-sm font-medium text-yellow-800">{heading}</h3>
      </div>
      <div className="mt-2 text-sm text-yellow-700">
        <div className="overflow-hidden">
          <div className="break-words">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default AttentionMessage;
