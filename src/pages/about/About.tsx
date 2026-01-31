import Navbar from '../../components/common/Navbar';
import Footer from '../../components/layout/Footer';
import FindUs from '../home/FindUs';
import Reviews from '../home/Reviews';
import Newsletter from '../home/Newsletter';
import Reservas from '../blog/ReservasSection';
import HeroSection from './HeroSection';

export default function About() {
  return (
    <div>    
        <Navbar /> 

        <main>
            <HeroSection />
            <Reservas />
            <Newsletter />
            <Reviews />
            <FindUs />
        </main>

        <Footer />
    </div>
  )
}
