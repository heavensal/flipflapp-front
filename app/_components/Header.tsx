import Image from 'next/image';

const Header = () => {

  return (
    <header className="h-[10dvh] p-6 sm:p-8">
      <div className="max-w-7xl mx-auto flex justify-center items-center h-full">
        <div className="flex items-end space-x-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <Image src="/flipflapp-logo.png" alt="Logo" width={40} height={40} className="object-contain" />
          </div>
          <span className="text-2xl font-bold text-title-yellow">FlipFlapp</span>
        </div>
      </div>
    </header>
  )
}

export default Header;
