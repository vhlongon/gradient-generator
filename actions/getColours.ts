'use server';
import { getErrorMessage } from '@/utils/utils';
import Vibrant from 'node-vibrant';
import { z } from 'zod';

const schema = z
  .unknown()
  .refine(
    (data) => {
      const acceptedMimeTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];

      const hasType = data && typeof data === 'object' && 'type' in data;

      if (!hasType) {
        return false;
      }

      if (typeof data.type !== 'string') {
        return false;
      }

      const fileMimeType = data.type;
      return acceptedMimeTypes.includes(fileMimeType);
    },
    {
      message: 'Invalid file type. Accepted types are image/jpeg, image/png, and image/svg+xml',
    }
  )
  .transform((data) => {
    const file: File | null = data as unknown as File;

    return file;
  });

export const getColours = async (formData: FormData) => {
  try {
    const image = formData.get('image');
    const parsed = schema.safeParse(image);

    if (!parsed.success) {
      return {
        error: parsed.error.message,
        data: null,
      };
    }

    const bytes = await parsed.data.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const palette = await Vibrant.from(buffer).getPalette();

    const data = {
      dominant: palette.Vibrant?.hex ?? '#000',
      muted: palette.Muted?.hex ?? '#000',
      darkVibrant: palette.DarkVibrant?.hex ?? '#000',
      lightVibrant: palette.LightVibrant?.hex ?? '#000',
      darkMuted: palette.DarkMuted?.hex ?? '#000',
      lightMuted: palette.LightMuted?.hex ?? '#000',
    };

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: null,
    };
  }
};
