/* eslint-disable @next/next/no-img-element */
import React from 'react';

type ImageProps = {
  name: string;
  src: string;
};
export const ImageViewer = ({ name, src }: ImageProps) => {
  return <img className="rounded-md w-56 h-56 object-cover border-gray-800 border-4" src={src} alt={name} />;
};
