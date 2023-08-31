import { ColorsData } from '@/types';
import { generateCssGradient } from '@/utils/utils';
import { useState } from 'react';

type GradientProps = {
  data: ColorsData;
};

export const Gradient = ({ data }: GradientProps) => {
  const [gradient, setGradient] = useState(generateCssGradient(data));

  return (
    <div className="flex flex-col items-center md:flex-row gap-4">
      <div
        className="relative flex content-center items-center justify-center h-44 w-44 rounded-lg shadow-md border-gray-800 border-4"
        style={{ backgroundImage: gradient }}
      />
      <div className="flex flex-col items-center md:items-start justify-between py-4 gap-4">
        <pre className="whitespace-pre-wrap bg-gray-600 bg-opacity-90 text-gray-300 rounded-md p-4 max-w-sm text-center">
          <code className="text-sm font-mono">background-image: {gradient};</code>
        </pre>

        <button
          className="bg-transparent border border-pink-400 border-solid text-pink-400 py-2 px-4 rounded-md hover:bg-pink-400 hover:text-white transition duration-300 ease-in-out inline-flex"
          type="button"
          onClick={() => {
            setGradient(generateCssGradient(data));
          }}
        >
          Randomize
        </button>
      </div>
    </div>
  );
};
