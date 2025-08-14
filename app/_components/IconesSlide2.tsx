import Image from 'next/image';

import Smartphone from './svg/Smartphone';
import Board from './svg/Board';

const IconesSlide2 = () => {

  return (
    <div className='grid grid-cols-2 mb-8'>

      <div className='place-content-center'>
        <Image src="/player-10.png" alt="Joueur de football" width={1024} height={1024} className="object-contain max-h-30" />
      </div>

      <div className='flex justify-center items-center'>
        {/* smartphone */}
        <Smartphone />

        {/* Feuille de match */}
        <Board />
      </div>

    </div>
  );
};

export default IconesSlide2;
