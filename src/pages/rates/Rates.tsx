import Navbar from '../../components/common/Navbar';
import Footer from '../../components/layout/Footer';
import FindUs from '../home/FindUs';
import Reviews from '../home/Reviews';
import Newsletter from '../home/Newsletter';
import HeroSection from './HeroSection';

export default function Rates() {
  return (
    <div>    
        <Navbar /> 

        <main>
            <HeroSection />
            <Newsletter />
            <Reviews />
            <FindUs />
        </main>

        <Footer />
    </div>
  )
}
