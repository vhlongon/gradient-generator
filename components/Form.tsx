'use client';

import { getColours } from '@/actions/getColours';
import { usePrevious } from '@/hooks/usePrevious';
import { ColorsData } from '@/types';
import { ChangeEventHandler, useState, useTransition } from 'react';
import { twMerge } from 'tailwind-merge';
import { Colors } from './Colors';
import { Gradient } from './Gradient';
import { ImageViewer } from './ImageViewer';

export const Form = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [colorsData, setColoursData] = useState<ColorsData | null>(null);
  const [image, setImage] = useState<{ name: string; src: string } | null>(null);
  const prevImage = usePrevious(image);
  const hasChanged = image?.name && prevImage?.name !== image?.name;

  const handleAction = (formData: FormData) => {
    setError('');
    startTransition(async () => {
      const { error, data } = await getColours(formData);

      if (error) {
        setError(error);
        return;
      }

      setColoursData(data);
    });
  };

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target?.files?.[0];

    if (!file) {
      return;
    }

    const name = file.name;
    const reader = new FileReader();

    reader.onload = (event) => {
      const src = event.target?.result;

      if (typeof src === 'string') {
        setImage({ src, name });
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-10">
      {isPending && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4zm0-16a8 8 0 018 8h4a12.01 12.01 0 00-3-8.062A11.963 11.963 0 0012 4z"
            />
          </svg>
        </div>
      )}
      <div className="flex flex-col items-center md:flex-row gap-4">
        {image && <ImageViewer {...image} />}
        <form
          className={twMerge(
            'flex flex-col items-center md:items-start justify-between py-4 gap-4',
            !image && 'md:items-center'
          )}
          action={handleAction}
        >
          <input
            name="image"
            id="image"
            type="file"
            accept="image/jpeg,image/png,image/svg+xml"
            multiple={false}
            onChange={handleFileUpload}
            placeholder="upload an image"
            className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:border-0 file:text-sm file:font-semibold
        file:bg-pink-50 file:text-pink-700
        hover:file:bg-pink-100 bottom-1 border-solid border-2 border-pink-400 rounded-md"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!hasChanged}
          >
            Generate
          </button>
        </form>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>}

      {colorsData && !error && !isPending && (
        <>
          <Gradient data={colorsData} />
          <Colors data={colorsData} />
        </>
      )}
    </div>
  );
};
