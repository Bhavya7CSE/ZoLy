import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { loadCharacterModel, RiggedCharacter } from './characterBuilder';
import { createEnvironmentEffects, EnvironmentEffects } from './particleSystems';
import { Mood } from '../../types';

interface CharacterStage3DProps {
  isNight: boolean;
  activeMood: Mood;
  onSelectKingdom: (kingdom: 'zoey' | 'lily') => void;
  onScrollToDreamHome?: () => void;
  onCharacterInteract?: (char: 'zoey' | 'lily') => void;
}

export const CharacterStage3D: React.FC<CharacterStage3DProps> = ({
  isNight,
  activeMood,
  onSelectKingdom,
  onScrollToDreamHome,
  onCharacterInteract,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadStatus, setLoadStatus] = useState('Conjuring 3D Princess Rigs...');

  const activeMoodRef = useRef<Mood>(activeMood);
  const isNightRef = useRef<boolean>(isNight);


  const zoeyRef = useRef<RiggedCharacter | null>(null);
  const lilyRef = useRef<RiggedCharacter | null>(null);
  const envEffectsRef = useRef<EnvironmentEffects | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Normalized pointer coordinates (-1 to 1)
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.2);
    cameraRef.current = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(isNight ? 0xd0d8f0 : 0xfff3e6, isNight ? 1.4 : 1.8);
    scene.add(ambientLight);

    const dirLightZoey = new THREE.DirectionalLight(0xb8ddf8, isNight ? 1.5 : 2.0);
    dirLightZoey.position.set(-3, 4, 3);
    scene.add(dirLightZoey);

    const dirLightLily = new THREE.DirectionalLight(0xd8c5f5, isNight ? 1.5 : 2.0);
    dirLightLily.position.set(3, 4, 3);
    scene.add(dirLightLily);

    const moonKeyLight = new THREE.DirectionalLight(0xfffaed, isNight ? 1.2 : 0.8);
    moonKeyLight.position.set(0, 6, -2);
    scene.add(moonKeyLight);

    // 4. Environment effects (Particles & Lake)
    const envEffects = createEnvironmentEffects();
    envEffectsRef.current = envEffects;
    scene.add(envEffects.group);

    // 5. Load Characters (Zoey on left, Lily on right)
    let isCancelled = false;

    async function initCharacters() {
      try {
        setLoadStatus('Awakening Princess Zoey...');
        const zoey = await loadCharacterModel('zoey');
        if (isCancelled) return;
        zoey.root.position.set(-1.45, 0, 0);
        scene.add(zoey.root);
        zoeyRef.current = zoey;

        setLoadStatus('Awakening Princess Lily...');
        const lily = await loadCharacterModel('lily');
        if (isCancelled) return;
        lily.root.position.set(1.45, 0, 0);
        scene.add(lily.root);
        lilyRef.current = lily;

        setIsLoading(false);
      } catch (err) {
        console.error('Character loading error:', err);
        setIsLoading(false);
      }
    }

    initCharacters();

    // 6. Responsive Resize
    function handleResize() {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      cameraRef.current.aspect = w / h;
      // Adjust camera distance for mobile portrait layouts
      if (w < 640) {
        cameraRef.current.position.z = 6.4;
        if (zoeyRef.current) zoeyRef.current.root.position.set(-1.1, 0.4, 0);
        if (lilyRef.current) lilyRef.current.root.position.set(1.1, -0.4, 0);
      } else {
        cameraRef.current.position.z = 5.2;
        if (zoeyRef.current) zoeyRef.current.root.position.set(-1.45, 0, 0);
        if (lilyRef.current) lilyRef.current.root.position.set(1.45, 0, 0);
      }
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // Check reduced-motion media query
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotionRef = { current: motionQuery.matches };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
    }

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Read live mood and night mode through refs to avoid stale closure
      const currentMood = activeMoodRef.current;
      const currentIsNight = isNightRef.current;

      // Update characters with reduced motion preference
      if (zoeyRef.current) {
        zoeyRef.current.update(elapsedTime, pointerRef.current, currentMood, prefersReducedMotionRef.current);
      }
      if (lilyRef.current) {
        lilyRef.current.update(elapsedTime, pointerRef.current, currentMood, prefersReducedMotionRef.current);
      }
      if (envEffectsRef.current) {
        envEffectsRef.current.update(elapsedTime, currentIsNight, prefersReducedMotionRef.current, currentMood);
      }

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange);
      }
      renderer.dispose();
    };
  }, []);

  // Sync isNightRef and update lighting on day/night change
  useEffect(() => {
    isNightRef.current = isNight;
    if (!sceneRef.current) return;
    sceneRef.current.traverse((child) => {
      if (child instanceof THREE.AmbientLight) {
        child.color.setHex(isNight ? 0xd0d8f0 : 0xfff3e6);
        child.intensity = isNight ? 1.4 : 1.8;
      }
    });
  }, [isNight]);

  // Sync activeMoodRef and trigger instant mood feedback on both characters and environment
  useEffect(() => {
    activeMoodRef.current = activeMood;
    if (activeMood === 'happy' || activeMood === 'sparkling') {
      zoeyRef.current?.triggerHappyReaction();
      lilyRef.current?.triggerHappyReaction();
      envEffectsRef.current?.spawnBurst(-1.45, 0.5, 0xb8ddf8);
      envEffectsRef.current?.spawnBurst(1.45, 0.5, 0xd8c5f5);
    } else if (activeMood === 'dreamy') {
      envEffectsRef.current?.spawnBurst(0, 0.8, 0xf4d98a);
    } else if (activeMood === 'sleepy') {
      envEffectsRef.current?.spawnBurst(-1.45, 0.2, 0x8ec9f6);
      envEffectsRef.current?.spawnBurst(1.45, 0.2, 0xb795ea);
    }
  }, [activeMood]);


  // Handle pointer tracking
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointerRef.current = { x, y };
  }

  // Handle tap or click on character
  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);

    const objectsToTest: THREE.Object3D[] = [];
    if (zoeyRef.current) objectsToTest.push(zoeyRef.current.root);
    if (lilyRef.current) objectsToTest.push(lilyRef.current.root);

    const intersects = raycaster.intersectObjects(objectsToTest, true);

    if (intersects.length > 0) {
      let hitObj = intersects[0].object;
      while (hitObj.parent && hitObj.parent !== sceneRef.current) {
        if (hitObj.name.includes('zoey')) {
          zoeyRef.current?.triggerHappyReaction();
          envEffectsRef.current?.spawnBurst(-1.45, 0.5, 0xb8ddf8);
          onCharacterInteract?.('zoey');
          return;
        }
        if (hitObj.name.includes('lily')) {
          lilyRef.current?.triggerHappyReaction();
          envEffectsRef.current?.spawnBurst(1.45, 0.5, 0xd8c5f5);
          onCharacterInteract?.('lily');
          return;
        }
        hitObj = hitObj.parent;
      }
    }
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      className="relative w-full h-full cursor-crosshair select-none touch-none overflow-hidden"
      aria-label="3D Fairytale Stage featuring Princess Zoey and Princess Lily"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Loading state indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FFF8F1]/80 backdrop-blur-sm z-30 transition-opacity">
          <div className="w-12 h-12 border-4 border-[#B8DDF8] border-t-[#D8C5F5] rounded-full animate-spin mb-4" />
          <p className="font-fairytale text-lg text-[#2D221E] font-medium tracking-wide">
            {loadStatus}
          </p>
          <span className="text-xs text-[#A43E68] mt-1 font-mono-tech">
            ✦ Initializing Three.js rigs &amp; materials
          </span>
        </div>
      )}

      {/* Handcrafted Fairytale Kingdom Gateway Dais & Dream Home Button */}
      <div className="absolute bottom-6 inset-x-0 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-10 md:px-16 pointer-events-none z-20 max-w-7xl mx-auto">
        {/* Zoey Floating Crystal Dais Gateway */}
        <div className="pointer-events-auto">
          <button
            onClick={() => onSelectKingdom('zoey')}
            className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
            aria-label="Enter Zoey's Crystal Kingdom"
          >
            <div className="relative animate-float" style={{ animationDuration: '4s' }}>
              <div className="absolute -inset-2 rounded-full bg-[#B8DDF8]/40 blur-md group-hover:bg-[#B8DDF8]/70 transition-colors" />
              <div className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#B8DDF8] shadow-md group-hover:border-[#4a9be8] transition-colors">
                <span className="text-xl group-hover:rotate-12 transition-transform">❄️</span>
                <div className="text-left">
                  <div className="font-fairytale font-bold text-xs sm:text-sm text-[#182635] leading-tight">
                    Zoey's Kingdom
                  </div>
                  <div className="text-[9px] text-[#4a9be8] font-mono-tech">
                    Crystal Peak &bull; Enter &rarr;
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Center Enter Dream Home Gateway Action */}
        {onScrollToDreamHome && (
          <div className="pointer-events-auto order-last sm:order-none mx-auto sm:mx-0">
            <button
              onClick={onScrollToDreamHome}
              className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-108 active:scale-95 focus:outline-none"
              aria-label="Enter the Dream Home"
            >
              <div className="relative animate-float" style={{ animationDuration: '3.8s', animationDelay: '0.4s' }}>
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#B8DDF8]/50 via-[#F4D98A]/40 to-[#D8C5F5]/50 blur-md group-hover:scale-110 transition-transform" />
                <div className="relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border-2 border-[#A43E68]/30 shadow-lg group-hover:border-[#A43E68] transition-colors">
                  <span className="text-xl group-hover:scale-125 transition-transform">🏰</span>
                  <div className="text-left">
                    <div className="font-fairytale font-bold text-xs sm:text-sm text-[#A43E68] leading-tight">
                      Enter the Dream Home
                    </div>
                    <div className="text-[9px] text-[#2D221E]/70 font-mono-tech flex items-center gap-1">
                      <span>9 Enchanted Wonders</span>
                      <span className="text-[#A43E68] font-bold group-hover:translate-y-0.5 transition-transform">↓</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Lily Floating Aurora Flower Dais Gateway */}
        <div className="pointer-events-auto">
          <button
            onClick={() => onSelectKingdom('lily')}
            className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
            aria-label="Enter Lily's Aurora Kingdom"
          >
            <div className="relative animate-float" style={{ animationDuration: '4.5s', animationDelay: '0.8s' }}>
              <div className="absolute -inset-2 rounded-full bg-[#D8C5F5]/40 blur-md group-hover:bg-[#D8C5F5]/70 transition-colors" />
              <div className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#D8C5F5] shadow-md group-hover:border-[#8a5cb8] transition-colors">
                <span className="text-xl group-hover:-rotate-12 transition-transform">🌙</span>
                <div className="text-left">
                  <div className="font-fairytale font-bold text-xs sm:text-sm text-[#2d1b38] leading-tight">
                    Lily's Kingdom
                  </div>
                  <div className="text-[9px] text-[#8a5cb8] font-mono-tech">
                    Aurora Meadow &bull; Enter &rarr;
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
