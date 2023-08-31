import { ColorsData } from '@/types';
import { generateCssGradient } from '@/utils/utils';
import { MouseEventHandler, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type GradientProps = {
  data: ColorsData;
};

export const Gradient = ({ data }: GradientProps) => {
  const [gradient, setGradient] = useState(generateCssGradient(data));
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick: MouseEventHandler<HTMLPreElement> = (e) => {
    try {
      const text = e.currentTarget?.textContent;

      if (!text) return;

      navigator.clipboard.writeText(text);

      setShowTooltip(true);

      setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center md:flex-row gap-6">
      <div className="relative h-72 w-72 md:h-96 md:w-96">
        <div className="absolute z-10 top-0 mask w-full h-full" style={{ backgroundImage: gradient }} />
        <div className="absolute z-0 top-2 mask w-full h-full rotate-6 bg-gray-600 bg-opacity-90" />
      </div>
      <div className="flex flex-col items-center md:items-start justify-between py-4 gap-4">
        <div className="relative">
          <pre
            className="flex flex-col whitespace-pre-wrap bg-gray-600 bg-opacity-90 text-gray-300 rounded-md p-4 max-w-sm text-center cursor-pointer relative"
            onClick={handleClick}
          >
            <code className="text-sm font-mono">background-image: {gradient};</code>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 self-end"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
              />
            </svg>
          </pre>
          <div
            className={twMerge(
              'absolute invisible opacity-0 bottom-0 right-0  bg-gray-800 bg-opacity-90 text-gray-300 rounded-md p-2 text-sm transition-opacity duration-300 ease-in-out',
              showTooltip && 'opacity-100 visible'
            )}
          >
            Copied!
          </div>
        </div>
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
