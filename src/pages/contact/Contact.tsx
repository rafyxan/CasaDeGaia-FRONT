import Navbar from '../../components/common/Navbar';
import Footer from '../../components/layout/Footer';
import FindUs from '../home/FindUs';
import Reviews from '../home/Reviews';
import ContactSection from './ContactSection';

export default function Contact() {
  return (
    <div>    
        <Navbar /> 

        <main>
            <ContactSection />
            <Reviews />
            <FindUs />
        </main>

        <Footer />
    </div>
  )
}
