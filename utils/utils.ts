import { ColorsData } from '@/types';

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String(error.message);
  }

  if (error) {
    return String(error);
  }

  return 'Something went wrong';
};

const createGradient = (type: 'linear' | 'radial', direction: string, colours: string[]): string => {
  return `${type}-gradient(${direction}, ${colours.join(', ')})`;
};

const getRandomDirection = () => `${Math.floor(Math.random() * 360)}deg`;

export const generateCssGradient = (colours: ColorsData, direction: string = getRandomDirection()): string => {
  const gradients = [
    createGradient('linear', direction, [colours.darkVibrant, colours.lightVibrant]),
    createGradient('linear', direction, [colours.darkMuted, colours.lightMuted]),
    createGradient('linear', direction, [colours.dominant, colours.muted]),
    createGradient('linear', direction, [colours.lightVibrant, colours.darkVibrant]),
    createGradient('linear', direction, [colours.lightMuted, colours.darkMuted]),
    createGradient('linear', direction, [colours.lightVibrant, colours.dominant]),
    createGradient('linear', direction, [colours.darkVibrant, colours.muted]),
    createGradient('radial', 'circle', [colours.darkVibrant, colours.lightVibrant]),
    createGradient('radial', 'circle', [colours.darkMuted, colours.lightMuted]),
    createGradient('radial', 'circle', [colours.dominant, colours.muted]),
    createGradient('radial', 'circle', [colours.lightVibrant, colours.darkVibrant]),
    createGradient('radial', 'circle', [colours.lightMuted, colours.darkMuted]),
    createGradient('radial', 'circle', [colours.lightVibrant, colours.dominant]),
    createGradient('radial', 'circle', [colours.darkVibrant, colours.muted]),
  ];

  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
};
