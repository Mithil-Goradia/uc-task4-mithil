import { motion } from 'framer-motion';

const transit = (Component) => {
  return function TransitComponent(props) {
    return (
      <motion.div
        className="slide"
        initial={{ translateY: '100%' }}  // Start below the screen
        animate={{ translateY: '0%' }}    // Slide up into view
        exit={{ translateY: '100%' }}      // Slide back down when exiting
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // Adjust timing and ease
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }}
      >
        {/* Wrapped component */}
        <Component {...props} />
      </motion.div>
    );
  };
};

export default transit;
