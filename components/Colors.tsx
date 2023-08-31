import { ColorsData } from '@/types';
import Swatch from './Swatch';

type ColorsProps = {
  data: ColorsData;
};
export const Colors = ({ data }: ColorsProps) => {
  return (
    <ul className="flex flex-wrap items-center justify-center">
      {Object.entries(data).map(([name, color]) => (
        <li key={name} className="w-full sm:w-1/2 md:w-1/3 p-2">
          <Swatch color={color} name={name} />
        </li>
      ))}
    </ul>
  );
};
