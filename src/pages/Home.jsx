import Nav2 from '../components/Nav2';
import Suggested from '../components/Suggested';
import transit from './transit';
import { motion } from 'framer-motion';
import Cart from '../components/Cart';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center relative">
      {/* Navigation */}
      <Nav2 />

      {/* Hero Section */}
      <div className="mt-10 flex flex-col items-center">
        <motion.img
          src="./back3.png"
          className="w-full max-w-[800px] md:max-w-[700px] sm:max-w-[400px]"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        />
        <p className="text-center mt-10 text-xl sm:text-2xl font-semibold">
          Welcome Back
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-wrap gap-5 justify-center items-start pt-20">
        <Suggested />
        <Cart />
      </div>

      {/* Footer Section */}
      <Footer className="mt-20" />
    </div>
  );
};

export default transit(Home);
