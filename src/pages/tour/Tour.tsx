import Navbar from '../../components/common/Navbar';
import Footer from '../../components/layout/Footer';
import FindUs from '../home/FindUs';
import Reviews from '../home/Reviews';
import TourRequestForm from './TourRequestForm';

export default function Tour() {
  return (
    <div>    
        <Navbar /> 

        <main>
            <TourRequestForm />
            <Reviews />
            <FindUs />
        </main>

        <Footer />
    </div>
  )
}
