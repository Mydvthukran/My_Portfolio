import { useEasterEgg } from '../context/EasterEggContext';

const ArcReactor = () => {
  const { themeState, triggerRescue } = useEasterEgg();

  if (themeState !== 'snapped') return null;

  return (
    <div className="arc-reactor-container" onClick={triggerRescue}>
      <div className="arc-reactor">
        <div className="arc-core"></div>
        <div className="arc-ring r1"></div>
        <div className="arc-ring r2"></div>
      </div>
      <div className="arc-tooltip">I am Iron Man.</div>
    </div>
  );
};

export default ArcReactor;
