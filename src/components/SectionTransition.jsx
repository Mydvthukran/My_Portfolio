import { motion } from 'framer-motion';

const SectionTransition = ({ isInView, type = "curtain" }) => {
  if (type === "curtain") {
    return (
      <>
        {/* The Accent Curtain (Behind the main one) */}
        <motion.div
          className="transition-wipe-accent"
          initial={{ y: '0%' }}
          animate={isInView ? { y: '-100%' } : { y: '0%' }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
        />
        {/* The Main Dark Curtain (On top) */}
        <motion.div
          className="transition-wipe-main"
          initial={{ y: '0%' }}
          animate={isInView ? { y: '-100%' } : { y: '0%' }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1], delay: 0 }}
        />
      </>
    );
  }

  if (type === "split") {
    return (
      <>
        <motion.div
          className="transition-split-left"
          initial={{ x: '0%' }}
          animate={isInView ? { x: '-100%' } : { x: '0%' }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
        />
        <motion.div
          className="transition-split-right"
          initial={{ x: '0%' }}
          animate={isInView ? { x: '100%' } : { x: '0%' }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
        />
      </>
    );
  }

  if (type === "slide") {
    return (
      <>
        <motion.div
          className="transition-slide-up-accent"
          initial={{ y: '0%' }}
          animate={isInView ? { y: '100%' } : { y: '0%' }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
        />
        <motion.div
          className="transition-slide-up"
          initial={{ y: '0%' }}
          animate={isInView ? { y: '100%' } : { y: '0%' }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1], delay: 0 }}
        />
      </>
    );
  }

  if (type === "blocks") {
    return (
      <div className="transition-blocks-container">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="transition-block"
            initial={{ scaleY: 1 }}
            animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1], delay: i * 0.08 }}
            style={{ originY: 1 }}
          />
        ))}
      </div>
    );
  }

  return null;
};

export default SectionTransition;
