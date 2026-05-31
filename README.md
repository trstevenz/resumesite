# Stephen Raj S | 3D Futuristic Portfolio & Resume

A next-generation, premium 3D resume portfolio website for **Stephen Raj S**, a Guidewire QA Tester (Manual & Automation, 3.9 years of experience), built using React, Three.js (React Three Fiber), GSAP (ScrollTrigger), Framer Motion, and Tailwind CSS v4.

Designed with a sleek cyberpunk-inspired HUD, combining smooth scroll-triggered 3D camera sweeps, dynamic star fields, geometric holographic avatars, and an interactive message CLI terminal.

---

## 🛠️ Tech Stack & Key Engines

1. **React 19 + TypeScript + Vite**: Fast, type-safe scaffolding.
2. **Three.js + React Three Fiber (R3F) + Drei**: GPU-accelerated 3D environment management.
3. **GreenSock (GSAP) + ScrollTrigger**: Smooth timeline transitions mapping vertical scrolls to 3D coordinate trajectories.
4. **Tailwind CSS v4**: Fluid styling using direct CSS variables configurations.
5. **Framer Motion**: Dampened physics, cursor reticles, and 2D overlay animations.
6. **Web Audio API Sound Synthesis**: Custom synthesized audio sweeps and drones playing dynamically in the browser (no static asset load delays!).

---

## 📁 Project Structure

```
├── public/                 # Static assets
└── src/
    ├── components/
    │   ├── 3D/             # Three.js Fiber Scenes
    │   │   ├── CanvasContainer.tsx      # Lights, postprocessing, camera scrolling
    │   │   ├── BackgroundParticles.tsx  # Rotating star galaxy
    │   │   ├── AvatarHologram.tsx       # Hover-aligned abstract holographic core
    │   │   ├── ExperienceNodes.tsx      # Interactive 3D career timeline node system
    │   │   └── SkillsPlanetarium.tsx    # Orbiting skills solar system
    │   ├── CustomCursor.tsx             # Spring-damped target reticle
    │   ├── SoundToggle.tsx              # Audio mute override button
    │   ├── Navbar.tsx                   # Progression dial and links HUD
    │   ├── Hero.tsx                     # Glitch heading and typed log box
    │   ├── About.tsx                    # System overview and stats grid
    │   ├── Experience.tsx               # Career journey log cards
    │   ├── Skills.tsx                   # Skill grid progress bars
    │   ├── Projects.tsx                 # Project scope details and metrics
    │   ├── Education.tsx                # Degree milestone logs
    │   └── Contact.tsx                  # Command-line query terminal and mail interface
    ├── hooks/
    │   ├── useSound.ts                  # Oscillator-synthesized blips and drones
    │   └── usePerformance.ts            # High Quality/Performance toggle hooks
    ├── App.tsx                          # Layout manager and scroll percent calculator
    ├── index.css                        # Styling rules and Tailwind imports
    └── main.tsx                         # Client mount loader
```

---

## 🚀 Getting Started

### 1. Install Dependencies
Run the installation command in your workspace directory:
```powershell
npm install
```

### 2. Run Local Development Server
Launch the local dev environment:
```powershell
npm run dev
```
Open your browser and navigate to the address listed (default is `http://localhost:5173`).

### 3. Build Production Bundle
To compile and optimize files for hosting, run:
```powershell
npm run build
```
This builds and creates the target assets folder under `dist/`.
