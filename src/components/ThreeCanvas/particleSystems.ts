import * as THREE from 'three';

export interface EnvironmentEffects {
  group: THREE.Group;
  update: (time: number, isNight: boolean, prefersReducedMotion?: boolean, mood?: string) => void;
  spawnBurst: (x: number, y: number, colorHex: number) => void;
}

/**
 * Creates a soft glowing radial alpha texture for Three.js points,
 * ensuring particles look like luminous fairytale stardust rather than harsh squares.
 */
function createFairytalePointTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const center = size / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    // Luminous inner core
    gradient.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    // Moon-cream warm aura
    gradient.addColorStop(0.18, 'rgba(255, 248, 241, 0.95)');
    // Fairytale shimmer blend
    gradient.addColorStop(0.45, 'rgba(216, 197, 245, 0.45)');
    // Soft dissipation
    gradient.addColorStop(0.75, 'rgba(184, 221, 248, 0.15)');
    gradient.addColorStop(1.0, 'rgba(184, 221, 248, 0.0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(center, center, center, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

export function createEnvironmentEffects(): EnvironmentEffects {
  const group = new THREE.Group();
  group.name = 'fairytale-environment';

  // ─────────────────────────────────────────────────────────────
  // 1. SOFT FLOATING STARDUST & FAIRY PARTICLES (Three.js Points)
  // ─────────────────────────────────────────────────────────────
  const particleCount = 140;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const originalPositions = new Float32Array(particleCount * 3);

  // Per-particle movement attributes
  const particleMeta: {
    driftSpeed: number;
    driftPhase: number;
    swayAmplitude: number;
    swayFrequency: number;
    depthSway: number;
    twinkleFreq: number;
    baseY: number;
  }[] = [];

  const fairytalePalette = [
    new THREE.Color(0xb8ddf8), // Powder Blue (Zoey)
    new THREE.Color(0xd0eaff), // Ice Crystal Shimmer
    new THREE.Color(0xd8c5f5), // Lavender (Lily)
    new THREE.Color(0xfce7f3), // Blush Pink
    new THREE.Color(0xf4d98a), // Butter Yellow
    new THREE.Color(0xfff8f1), // Moon Cream
  ];

  for (let i = 0; i < particleCount; i++) {
    // Spread across the full 3D viewport
    const x = (Math.random() - 0.5) * 8.0;
    const y = -2.2 + Math.random() * 5.2;
    const z = -1.5 + (Math.random() - 0.5) * 4.5;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    originalPositions[i * 3] = x;
    originalPositions[i * 3 + 1] = y;
    originalPositions[i * 3 + 2] = z;

    // Color gradient based on kingdom position:
    // Left side (Zoey) leans powder blue/ice; Right side (Lily) leans lavender/blush/gold
    let chosenColor: THREE.Color;
    if (x < -1.0) {
      // Zoey's domain
      chosenColor = Math.random() > 0.35 ? fairytalePalette[0] : fairytalePalette[1];
    } else if (x > 1.0) {
      // Lily's domain
      const r = Math.random();
      chosenColor = r < 0.4 ? fairytalePalette[2] : r < 0.7 ? fairytalePalette[3] : fairytalePalette[4];
    } else {
      // Central celestial moonlit lake
      chosenColor = Math.random() > 0.5 ? fairytalePalette[5] : fairytalePalette[4];
    }

    colors[i * 3] = chosenColor.r;
    colors[i * 3 + 1] = chosenColor.g;
    colors[i * 3 + 2] = chosenColor.b;

    particleMeta.push({
      driftSpeed: 0.12 + Math.random() * 0.18,
      driftPhase: Math.random() * Math.PI * 2,
      swayAmplitude: 0.08 + Math.random() * 0.16,
      swayFrequency: 0.6 + Math.random() * 0.8,
      depthSway: 0.06 + Math.random() * 0.1,
      twinkleFreq: 1.2 + Math.random() * 2.0,
      baseY: y,
    });
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const pointTexture = createFairytalePointTexture();

  const particleMat = new THREE.PointsMaterial({
    size: 0.28,
    map: pointTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const softParticles = new THREE.Points(particleGeo, particleMat);
  softParticles.name = 'soft-fairytale-particles';
  group.add(softParticles);

  // ─────────────────────────────────────────────────────────────
  // 2. ZOEY'S CRYSTAL BUBBLES (Subtle rising orbs on the left)
  // ─────────────────────────────────────────────────────────────
  const bubbleCount = 28;
  const bubbleGeo = new THREE.SphereGeometry(0.08, 12, 12);
  const bubbleMat = new THREE.MeshStandardMaterial({
    color: 0xb8ddf8,
    transparent: true,
    opacity: 0.55,
    roughness: 0.15,
    metalness: 0.85,
    emissive: 0x82c8f8,
    emissiveIntensity: 0.3,
  });

  const bubbles: { mesh: THREE.Mesh; seed: number; speed: number; startX: number; startZ: number }[] = [];
  for (let i = 0; i < bubbleCount; i++) {
    const mesh = new THREE.Mesh(bubbleGeo, bubbleMat);
    const startX = -1.8 + (Math.random() - 0.5) * 2.0;
    const startZ = -0.5 + (Math.random() - 0.5) * 1.8;
    const scale = 0.5 + Math.random() * 1.1;
    mesh.scale.set(scale, scale, scale);
    mesh.position.set(startX, -2 + Math.random() * 4, startZ);
    group.add(mesh);
    bubbles.push({
      mesh,
      seed: Math.random() * 100,
      speed: 0.3 + Math.random() * 0.45,
      startX,
      startZ,
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 3. MOONLIT WATER SURFACE & CRYSTAL REFLECTIONS
  // ─────────────────────────────────────────────────────────────
  const lakeGeo = new THREE.PlaneGeometry(12, 6, 24, 24);
  const lakeMat = new THREE.MeshStandardMaterial({
    color: 0x14233c,
    roughness: 0.25,
    metalness: 0.8,
    transparent: true,
    opacity: 0.7,
  });
  const lake = new THREE.Mesh(lakeGeo, lakeMat);
  lake.rotation.x = -Math.PI / 2;
  lake.position.set(0, -1.35, 0);
  group.add(lake);

  // Shimmering crystal reflection facets on the water
  const crystalReflections: THREE.Mesh[] = [];
  const refGeo = new THREE.OctahedronGeometry(0.14, 0);
  const refMat = new THREE.MeshStandardMaterial({
    color: 0xd0eaff,
    roughness: 0.1,
    metalness: 0.9,
    emissive: 0x8ec9f6,
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.65,
  });

  const refCoords = [
    [-2.2, -1.32, 0.4],
    [-1.0, -1.31, 0.8],
    [0.0, -1.30, 0.5],
    [1.2, -1.31, 0.7],
    [2.3, -1.32, 0.3],
  ];

  refCoords.forEach(([rx, ry, rz]) => {
    const rMesh = new THREE.Mesh(refGeo, refMat);
    rMesh.position.set(rx, ry, rz);
    rMesh.scale.set(1.4, 0.3, 1.4);
    group.add(rMesh);
    crystalReflections.push(rMesh);
  });

  // ─────────────────────────────────────────────────────────────
  // 4. INTERACTIVE BURST PARTICLES
  // ─────────────────────────────────────────────────────────────
  const burstParticles: { mesh: THREE.Mesh; velocity: THREE.Vector3; life: number }[] = [];

  function spawnBurst(x: number, y: number, colorHex: number) {
    const burstCount = 10;
    for (let i = 0; i < burstCount; i++) {
      const geo = new THREE.OctahedronGeometry(0.06, 0);
      const mat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 1.0 });
      const p = new THREE.Mesh(geo, mat);
      p.position.set(x, y, 0.2);
      group.add(p);

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.7 + Math.random() * 1.2;
      burstParticles.push({
        mesh: p,
        velocity: new THREE.Vector3(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed + 0.4,
          (Math.random() - 0.5) * 0.4
        ),
        life: 1.0,
      });
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 5. UPDATE LOOP (Respecting reduced-motion preferences)
  // ─────────────────────────────────────────────────────────────
  function update(
    time: number,
    isNight: boolean,
    prefersReducedMotion: boolean = false,
    mood: string = 'happy'
  ) {
    const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;

    if (prefersReducedMotion) {
      // In reduced-motion mode:
      // Particles remain calmly suspended in 3D space like a serene starlit sky
      for (let i = 0; i < particleCount; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];
        posAttr.setXYZ(i, ox, oy, oz);
      }
      posAttr.needsUpdate = true;
      particleMat.opacity = 0.75 + Math.sin(time * 0.5) * 0.1;
    } else {
      // Normal Fairytale Motion modulated by mood
      const speedMultiplier = mood === 'sleepy' ? 0.5 : mood === 'sparkling' ? 1.6 : 1.0;
      const swayMultiplier = mood === 'dreamy' ? 1.4 : 1.0;

      for (let i = 0; i < particleCount; i++) {
        const meta = particleMeta[i];
        const ox = originalPositions[i * 3];
        const oz = originalPositions[i * 3 + 2];

        // Upward drift with smooth loop
        meta.baseY += 0.004 * meta.driftSpeed * speedMultiplier;
        if (meta.baseY > 3.0) {
          meta.baseY = -2.2;
        }

        // Horizontal and depth organic floating sway
        const currentX = ox + Math.sin(time * meta.swayFrequency + meta.driftPhase) * (meta.swayAmplitude * swayMultiplier);
        const currentY = meta.baseY + Math.cos(time * 0.5 + meta.driftPhase) * 0.04;
        const currentZ = oz + Math.sin(time * 0.4 + meta.driftPhase) * meta.depthSway;

        posAttr.setXYZ(i, currentX, currentY, currentZ);
      }
      posAttr.needsUpdate = true;

      // Soft twinkle in starlight adjusted by mood
      const twinkleSpeed = mood === 'sparkling' ? 3.5 : mood === 'sleepy' ? 0.8 : 1.5;
      particleMat.opacity = 0.82 + Math.sin(time * twinkleSpeed) * (mood === 'sparkling' ? 0.16 : 0.08);
    }

    // Update Zoey's bubbles floating gently
    for (const b of bubbles) {
      if (prefersReducedMotion) {
        // Subtle resting bob without upward displacement
        b.mesh.position.y = -0.5 + Math.sin(time * 0.4 + b.seed) * 0.03;
      } else {
        b.mesh.position.y += 0.008 * b.speed;
        b.mesh.position.x = b.startX + Math.sin(time * 0.9 + b.seed) * 0.08;
        b.mesh.position.z = b.startZ + Math.cos(time * 0.9 + b.seed) * 0.05;
        b.mesh.rotation.y += 0.008;

        if (b.mesh.position.y > 2.4) {
          b.mesh.position.y = -1.8;
        }
      }
    }

    // Water surface color adjustment based on day/night
    lakeMat.color.setHex(isNight ? 0x0f1c30 : 0xd8ebfa);
    lakeMat.opacity = isNight ? 0.85 : 0.65;

    // Gently rotate lake crystal reflections
    crystalReflections.forEach((cr, idx) => {
      if (!prefersReducedMotion) {
        cr.rotation.y = time * 0.4 + idx;
        cr.rotation.z = Math.sin(time * 0.5 + idx) * 0.1;
      }
    });

    // Update burst particles
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const bp = burstParticles[i];
      bp.life -= 0.025;
      bp.mesh.position.addScaledVector(bp.velocity, 0.02);
      bp.velocity.y -= 0.04;
      (bp.mesh.material as THREE.MeshBasicMaterial).opacity = bp.life;

      if (bp.life <= 0) {
        group.remove(bp.mesh);
        bp.mesh.geometry.dispose();
        burstParticles.splice(i, 1);
      }
    }
  }

  return {
    group,
    update,
    spawnBurst,
  };
}
