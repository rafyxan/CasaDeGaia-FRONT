import Navbar from '../../components/common/Navbar';
import Footer from '../../components/layout/Footer';
import FindUs from '../home/FindUs';
import Reviews from '../home/Reviews';
import Newsletter from '../home/Newsletter';
import HeroSection from './HeroSection';
import RatesSection from './RatesSection';

export default function Rates() {
  return (
    <div>    
        <Navbar /> 

        <main>
            <HeroSection />
            <RatesSection />
            <Newsletter />
            <Reviews />
            <FindUs />
        </main>

        <Footer />
    </div>
  )
}
