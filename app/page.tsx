'use client';

// components
import Header from './_components/Header';
import CarrouselContainer from './_components/CarrouselContainer';
import BetaTesterForm from './_components/BetaTesterForm';
import Footer from './_components/Footer';

export default function Home() {

  return (
    <div className="bg-gradient-to-br from-bg-green to-bg-green-2 relative overflow-hidden">

        {/* 10dvh */}
        <Header />

        {/* 80dvh */}
        <main className="flex-1 px-4 sm:px-8 py-4">
          <CarrouselContainer />
          {/* Vous pouvez décommenter cette ligne pour tester le formulaire beta */}
          <BetaTesterForm />
        </main>
        <Footer />

    </div>
  );
}
