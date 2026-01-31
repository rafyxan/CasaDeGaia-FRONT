import Navbar from '../../components/common/Navbar';
import Footer from '../../components/layout/Footer';
import FindUs from '../home/FindUs';
import Reviews from '../home/Reviews';
import Newsletter from '../home/Newsletter';

export default function About() {
  return (
    <div>    
        <Navbar /> 

        <main>
            <Newsletter />
            <Reviews />
            <FindUs />
        </main>

        <Footer />
    </div>
  )
}
