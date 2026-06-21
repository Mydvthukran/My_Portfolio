import { useEasterEgg } from '../context/EasterEggContext';
import DefaultAbout from './DefaultAbout';
import AvengersAbout from './AvengersAbout';

const About = () => {
  const { themeState } = useEasterEgg();

  if (themeState === 'snapped') {
    return <AvengersAbout />;
  }

  return <DefaultAbout />;
};

export default About;
