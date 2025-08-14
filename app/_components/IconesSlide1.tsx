import Image from 'next/image';

import Map from './svg/Map';
import Calendar from './svg/Calendar';

const IconesSlide1 = () => {

  return (
    <div className='flex justify-between items-center mb-8'>
      <div className='text-center'>
        <Image src="/planner-pnj.png" alt="organisateur du foot" width={1024} height={1024} className="object-contain h-30" />
      </div>

      <div className='flex justify-center items-center'>
        {/* icone de calendrier */}
        <div className="relative w-40 h-20">
          {/* Calendar SVG - rotated -45deg and positioned left */}
          <Calendar />

          {/* Map SVG - rotated 45deg and positioned right with 25% overlap */}
          <Map />

        </div>
      </div>
    </div>
  );
};

export default IconesSlide1;
