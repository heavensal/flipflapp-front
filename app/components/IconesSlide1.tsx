import Image from 'next/image';

const IconesSlide1 = () => {

  return (
    <div className='flex justify-between items-center mb-8'>
      <div className='text-center'>
        <Image src="/planner-pnj.png" alt="organisateur du foot" width={120} height={120} className="object-contain h-30" />
      </div>

      <div className='flex justify-center items-center'>
        {/* icone de calendrier */}
        <div className="relative w-40 h-20">
          {/* Calendar SVG - rotated -45deg and positioned left */}
          <svg
            viewBox="0 0 48 48"
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 transform -rotate-25 h-20 z-10"
          >
            <path fill="#CFD8DC" d="M5 38V14h38v24c0 2.2-1.8 4-4 4H9c-2.2 0-4-1.8-4-4"/>
            <path fill="#F44336" d="M43 10v6H5v-6c0-2.2 1.8-4 4-4h30c2.2 0 4 1.8 4 4"/>
            <g fill="#B71C1C"><circle cx="33" cy="10" r="3"/><circle cx="15" cy="10" r="3"/></g>
            <path d="M33 3c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2M15 3c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2" fill="#B0BEC5"/>
            <path d="M13 20h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4zm-18 6h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4zm-18 6h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4z" fill="#90A4AE"/>
          </svg>

          {/* Map SVG - rotated 45deg and positioned right with 25% overlap */}
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 transform h-20 z-20"
            style={{ right: '20px' }}
          >
            <path d="m8 2 8 1v19l-8-1z" fill="#ecf0f1"/>
            <path d="m2 3 6-1v19l-6 1zm14 0 6-1v19l-6 1z" fill="#bdc3c7"/>
            <path d="m3 4 5-1v17l-5 1z" fill="#27ae60"/>
            <path d="m8 3 8 1v17l-8-1z" fill="#2ecc71"/>
            <path d="m21 20-5 1V4l5-1z" fill="#27ae60"/>
            <path d="m5.688 3.4-2.313.5L8 8.8V5.9zM21 18l-5 1v-6l5-3z" fill="#f39c12"/>
            <path d="m21 20-5 1v-6l5-3z" fill="#2980b9"/>
            <path d="m8 14 8-1v6l-8-1z" fill="#f1c40f"/>
            <path d="m8 16 8-1v6l-8-1z" fill="#3498db"/>
            <path d="m3 17 5-3v4l-5 1z" fill="#f39c12"/>
            <path d="m3 19 5-3v4l-5 1z" fill="#2980b9"/>
            <path d="M8 8.8V5.902l4 8.66h-1.469z" fill="#f1c40f"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default IconesSlide1;
