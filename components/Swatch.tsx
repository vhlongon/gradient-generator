type SwatchProps = {
  color: string;
  name: string;
};

export const Swatch = ({ color, name }: SwatchProps) => {
  return (
    <div
      className="relative flex content-center items-center justify-center h-28 rounded-lg shadow-md w-full border-gray-800 border-4"
      style={{ backgroundColor: color }}
    >
      <span className="items-center justify-center font-bold text-white text-opacity-75 bg-gray-900 bg-opacity-30 rounded-sm px-4 py-2">
        {name}
      </span>
    </div>
  );
};
