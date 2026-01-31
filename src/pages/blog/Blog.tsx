import Navbar from '../../components/common/Navbar';
import Footer from '../../components/layout/Footer';
import FindUs from '../home/FindUs';
import Reviews from '../home/Reviews';
import Newsletter from '../home/Newsletter';
import BlogDetails from './BlogDetails';
import HeroSection from './HeroSection';
import Reservas from './ReservasSection';

export default function Blog() {
  return (
    <div>    
        <Navbar /> 

        <main>
            <HeroSection />
            <BlogDetails />
            <Reservas />
            <Newsletter />
            <Reviews />
            <FindUs />
        </main>

        <Footer />
    </div>
  )
}
