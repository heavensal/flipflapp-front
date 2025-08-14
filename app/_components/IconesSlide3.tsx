import Image from 'next/image';

const IconesSlide3 = () => {

  return (
    <div className='place-content-center mb-8'>
      {/* flipflapp-front/public/team_ready_foot.png */}
      <Image src="/team_ready_foot.png" alt="Équipe prête" width={2800} height={1024} className="object-contain w-full h-30" />
    </div>
  );
};

export default IconesSlide3;
