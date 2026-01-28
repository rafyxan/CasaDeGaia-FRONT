import Navbar from '../../components/common/Navbar';
import Footer from '../../components/layout/Footer';
import FindUs from './FindUs';
import Reviews from './Reviews';
import HeroSection from './HeroSection';
import Newsletter from './Newsletter';
import ExploreHouse from './ExploreHouse';
import BlogPreview from './BlogPreview';
import InfoPreview from './InfoPreview';

export default function Home() {
  return (
    <div>    
        <Navbar /> 

        <main>
            <h1 className="text-3xl p-8 text-center">Contenido de la Página Principallllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll</h1>        
            <HeroSection />
            <InfoPreview />
            <ExploreHouse />
            <BlogPreview />
            <Newsletter />
            <Reviews />
            <FindUs />
        </main>

        <Footer />
    </div>
  );
}
