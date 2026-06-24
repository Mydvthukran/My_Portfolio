# Manish Yadav — Cinematic Developer Portfolio

A highly interactive, visually striking personal portfolio designed to showcase technical skills and projects through a cinematic lens. Built around smooth scrolling, parallax effects, dynamic section transitions, and a hidden Marvel-themed Easter egg that fully re-skins the site.

**Live Demo:** [https://manishthukran.vercel.app](https://manishthukran.vercel.app)

## Features

- **Cinematic scroll experience** — GSAP + ScrollTrigger drive parallax, fade-ins, and dynamic background-color shifts between sections, on top of Lenis-powered smooth scrolling.
- **Orbiting skills visualization** — a 3-ring, mouse-reactive orbit system on desktop that collapses into a clean staggered tag grid on mobile, both built with Framer Motion.
- **Custom cursor & magnetic buttons** — a lerp-smoothed custom cursor (skipped entirely on touch devices for performance) and buttons that pull toward the pointer on hover.
- **Ambient audio** — an optional looping rain track for atmosphere.
- **A hidden, fully-built Easter egg** — clicking the Infinity Gauntlet in the Hero re-skins the entire site (Hero, About, Skills, Projects, Contact) into an Avengers theme via a custom React Context state machine. The transition is backed by hand-built Web Audio API sound design — oscillator-based sub-bass and arc-reactor sweeps synthesized at runtime, no audio files — layered with the browser's Speech Synthesis API for a voice line. The Skills section also gets an animated spider-web SVG overlay in this state.
- **Responsive by design, not just by breakpoint** — key sections (Skills, the Easter-egg theme) ship dedicated mobile layouts rather than scaled-down desktop ones.

## Tech Stack

- **React 19 + Vite** — core framework and build tooling
- **GSAP (GreenSock) + ScrollTrigger** — scroll-driven animation and section transitions
- **Lenis** — smooth scrolling
- **Framer Motion** — spring-physics interactions and the skills orbit/grid
- **Web Audio API & SpeechSynthesis API** — custom-synthesized sound design for the Easter egg
- **React Context API** — global theme / Easter-egg state machine

## Project Structure

Each themeable section (`Hero`, `Skills`, `About`, `Projects`, `Contact`) is a thin wrapper that reads Easter-egg state from context and renders either its `Default*` or `Avengers*` variant:

```
src/
├── context/EasterEggContext.jsx   # theme state machine (default / snapped / resetting)
├── utils/audioUtils.js            # Web Audio synthesis (sub-bass boom, arc-reactor sweep)
├── sections/
│   ├── Hero.jsx     → DefaultHero.jsx     | AvengersHero.jsx
│   ├── Skills.jsx   → (orbit / grid)      | AvengersSkills.jsx
│   ├── About.jsx    → DefaultAbout.jsx    | AvengersAbout.jsx
│   ├── Projects.jsx → DefaultProjects.jsx | AvengersProjects.jsx
│   └── Contact.jsx                        | AvengersContact.jsx
└── components/                     # CustomCursor, MagneticButton, ArcReactor, AmbientAudio
```

## Local Setup

To run this portfolio locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mydvthukran/My_Portfolio.git
   cd My_Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

> **Easter Egg:** Try clicking the Infinity Gauntlet hidden in the Hero section to trigger the "Endgame" protocol...
