import Image from 'next/image';

import Smartphone from './svg/Smartphone';
import Board from './svg/Board';

const IconesSlide2 = () => {

  return (
    <div className='flex justify-between items-center mb-8'>

      <div className='text-center w-1/2'>
        <Image src="/player-10.png" alt="Joueur de football" width={1024} height={1024} className="object-contain max-h-40" />
      </div>

      <div className='flex justify-center items-center w-1/2'>
        {/* smartphone */}
        <Smartphone />

        {/* Feuille de match */}
        <Board />
      </div>

    </div>
  );
};

export default IconesSlide2;
