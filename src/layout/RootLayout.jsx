import { Outlet } from 'react-router';
import Navbar from '../pages/Navbar/Navbar';
import Footer from '../pages/shared/Footer';

const RootLayout = () => {
    return (
      <div className='mx-10'>
        <div>
            <Navbar></Navbar>
        </div>
        <div className='min-h-[200px]'>
          <Outlet></Outlet>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    );
};

export default RootLayout;