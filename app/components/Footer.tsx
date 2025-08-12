const Footer = () => {

  return (
    <footer className="p-6 sm:p-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-4 text-indigo-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-sm">En développement</span>
          </div>
          <span className="text-indigo-400">•</span>
          <span className="text-sm">Bientôt disponible</span>
        </div>
      </div>
    </footer>
  );

};

export default Footer;
