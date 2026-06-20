import { motion } from 'framer-motion';

const CurtainTransition = ({ isInView }) => {
  return (
    <>
      {/* The Accent Curtain (Behind the main one) */}
      <motion.div
        className="curtain-wipe-accent"
        initial={{ y: '0%' }}
        animate={isInView ? { y: '-100%' } : { y: '0%' }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.15 }}
      />
      
      {/* The Main Dark Curtain (On top) */}
      <motion.div
        className="curtain-wipe-main"
        initial={{ y: '0%' }}
        animate={isInView ? { y: '-100%' } : { y: '0%' }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0 }}
      />
    </>
  );
};

export default CurtainTransition;
