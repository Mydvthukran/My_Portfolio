import { useEasterEgg } from '../context/EasterEggContext';
import DefaultProjects from './DefaultProjects';
import AvengersProjects from './AvengersProjects';

const Projects = () => {
  const { themeState } = useEasterEgg();

  if (themeState === 'snapped') {
    return <AvengersProjects />;
  }

  return <DefaultProjects />;
};

export default Projects;
