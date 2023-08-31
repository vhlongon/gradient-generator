'use client';

import { getColours } from '@/actions/getColours';
import { ColorsData } from '@/types';
import { useState, useTransition } from 'react';
import { Colors } from './Colors';

export const Form = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [data, setData] = useState<ColorsData | null>(null);

  const handleAction = (formData: FormData) => {
    setError('');
    startTransition(async () => {
      const { error, data } = await getColours(formData);

      if (error) {
        setError(error);
        return;
      }

      setData(data);
    });
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <form className="flex flex-col gap-4 max-w-xs" action={handleAction}>
        <input
          name="image"
          id="image"
          type="file"
          accept="image/jpeg,image/png,image/svg+xml"
          multiple={false}
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
          disabled={isPending}
        >
          Generate
        </button>
      </form>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>}

      {data && <Colors data={data} />}
    </div>
  );
};
