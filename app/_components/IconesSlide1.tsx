import Image from 'next/image';

import Map from './svg/Map';
import Calendar from './svg/Calendar';

const IconesSlide1 = () => {
  return (
    <div className="grid grid-cols-2 mb-8">
      <div className="place-content-center">
        <Image
          src="/planner-pnj.png"
          alt="organisateur du foot"
          width={1024}
          height={1024}
          className="object-contain h-30"
        />
      </div>

      <div className="place-content-center">
        <div className="relative h-20 flex justify-center items-center">
          <Calendar />
          <Map />
        </div>
      </div>
    </div>
  );
};

export default IconesSlide1;
