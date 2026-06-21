import { useEasterEgg } from '../context/EasterEggContext';
import DefaultHero from './DefaultHero';
import AvengersHero from './AvengersHero';

const Hero = () => {
  const { themeState } = useEasterEgg();

  if (themeState === 'snapped') {
    return <AvengersHero />;
  }

  return <DefaultHero />;
};

export default Hero;
