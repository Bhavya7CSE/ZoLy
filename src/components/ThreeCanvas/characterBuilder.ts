import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface RiggedCharacter {
  root: THREE.Group;
  headNode: THREE.Group;
  leftEyelid: THREE.Mesh;
  rightEyelid: THREE.Mesh;
  leftPupil: THREE.Mesh;
  rightPupil: THREE.Mesh;
  wandOrFlower?: THREE.Group;
  crownGroup: THREE.Group;
  gownMesh: THREE.Mesh;
  update: (time: number, pointer: { x: number; y: number }, mood?: string, prefersReducedMotion?: boolean) => void;
  triggerHappyReaction: () => void;
  isExternalGLB: boolean;
}

export function createRiggedPrincess(type: 'zoey' | 'lily'): RiggedCharacter {
  const root = new THREE.Group();
  root.name = `${type}-root`;

  const isZoey = type === 'zoey';

  // Materials & Colors
  const skinColor = isZoey ? 0xfff0ea : 0xffebd9;
  const hairColor = isZoey ? 0xf0f7ff : 0x5a3d31; // Zoey: platinum ice blonde; Lily: chestnut
  const gownColor = isZoey ? 0xb8ddf8 : 0xd8c5f5; // Zoey: powder blue; Lily: lavender
  const gownAccent = isZoey ? 0xffffff : 0xfce7f3; // Zoey: icy white; Lily: blush pink
  const eyeColor = isZoey ? 0x4a9be8 : 0x8a5cb8; // Zoey: crystal cyan; Lily: warm violet
  const crownColor = isZoey ? 0xd0eaff : 0xf4d98a; // Zoey: crystal tiara; Lily: butter gold

  const skinMat = new THREE.MeshStandardMaterial({
    color: skinColor,
    roughness: 0.6,
    metalness: 0.05,
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: hairColor,
    roughness: 0.7,
    metalness: 0.1,
  });

  const gownMat = new THREE.MeshStandardMaterial({
    color: gownColor,
    roughness: 0.45,
    metalness: 0.15,
  });

  const gownTrimMat = new THREE.MeshStandardMaterial({
    color: gownAccent,
    roughness: 0.3,
    metalness: 0.2,
  });

  // Base Pedestal / Soft cloud shadow
  const shadowGeo = new THREE.CircleGeometry(0.85, 32);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: isZoey ? 0x9dc9ec : 0xc7b0eb,
    transparent: true,
    opacity: 0.35,
  });
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.15;
  root.add(shadow);

  // 1. Gown & Body (Bell shape)
  const gownGeo = new THREE.CylinderGeometry(0.38, 0.9, 1.25, 24, 4);
  const gownMesh = new THREE.Mesh(gownGeo, gownMat);
  gownMesh.position.y = -0.45;
  root.add(gownMesh);

  // Ruffled bottom trim
  const trimGeo = new THREE.TorusGeometry(0.9, 0.08, 12, 32);
  const trimMesh = new THREE.Mesh(trimGeo, gownTrimMat);
  trimMesh.rotation.x = Math.PI / 2;
  trimMesh.position.y = -1.05;
  root.add(trimMesh);

  // Waist Ribbon & Bow
  const ribbonGeo = new THREE.TorusGeometry(0.42, 0.05, 12, 24);
  const ribbonMesh = new THREE.Mesh(ribbonGeo, gownTrimMat);
  ribbonMesh.rotation.x = Math.PI / 2;
  ribbonMesh.position.y = 0.12;
  root.add(ribbonMesh);

  // 2. Arms & Hands
  const armGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.45, 12);
  const leftArm = new THREE.Mesh(armGeo, gownMat);
  leftArm.position.set(-0.48, 0.0, 0.05);
  leftArm.rotation.z = Math.PI / 6;
  root.add(leftArm);

  const rightArm = new THREE.Mesh(armGeo, gownMat);
  rightArm.position.set(0.48, 0.0, 0.05);
  rightArm.rotation.z = -Math.PI / 6;
  root.add(rightArm);

  const handGeo = new THREE.SphereGeometry(0.09, 12, 12);
  const leftHand = new THREE.Mesh(handGeo, skinMat);
  leftHand.position.set(-0.62, -0.22, 0.08);
  root.add(leftHand);

  const rightHand = new THREE.Mesh(handGeo, skinMat);
  rightHand.position.set(0.62, -0.22, 0.08);
  root.add(rightHand);

  // Prop: Crystal wand for Zoey, Moonflower for Lily
  const propGroup = new THREE.Group();
  if (isZoey) {
    // Crystal wand
    const stickGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 8);
    const stickMat = new THREE.MeshStandardMaterial({ color: 0xd0eaff, metalness: 0.8, roughness: 0.2 });
    const stick = new THREE.Mesh(stickGeo, stickMat);
    const starGeo = new THREE.OctahedronGeometry(0.12, 0);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x9bd4ff,
      emissiveIntensity: 0.6,
      roughness: 0.1,
    });
    const star = new THREE.Mesh(starGeo, starMat);
    star.position.y = 0.25;
    propGroup.add(stick);
    propGroup.add(star);
    propGroup.position.set(0.62, -0.15, 0.18);
    propGroup.rotation.z = -0.3;
  } else {
    // Moonflower blossom
    const stemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35, 8);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x85c494 });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    const flowerGeo = new THREE.DodecahedronGeometry(0.12, 0);
    const flowerMat = new THREE.MeshStandardMaterial({
      color: 0xfce7f3,
      emissive: 0xd8c5f5,
      emissiveIntensity: 0.5,
    });
    const flower = new THREE.Mesh(flowerGeo, flowerMat);
    flower.position.y = 0.2;
    propGroup.add(stem);
    propGroup.add(flower);
    propGroup.position.set(0.62, -0.15, 0.18);
    propGroup.rotation.z = -0.25;
  }
  root.add(propGroup);

  // 3. Neck & Head Bone Hierarchy (for pointer tilt & nodding)
  const headNode = new THREE.Group();
  headNode.name = `${type}-head-bone`;
  headNode.position.set(0, 0.45, 0); // Pivot point of neck
  root.add(headNode);

  // Head mesh
  const headGeo = new THREE.SphereGeometry(0.48, 28, 28);
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  headNode.add(headMesh);

  // Rosy cheeks
  const cheekMat = new THREE.MeshBasicMaterial({
    color: 0xffa0b0,
    transparent: true,
    opacity: 0.55,
  });
  const cheekGeo = new THREE.CircleGeometry(0.09, 16);
  const leftCheek = new THREE.Mesh(cheekGeo, cheekMat);
  leftCheek.position.set(-0.25, -0.08, 0.44);
  headNode.add(leftCheek);

  const rightCheek = new THREE.Mesh(cheekGeo, cheekMat);
  rightCheek.position.set(0.25, -0.08, 0.44);
  headNode.add(rightCheek);

  // Tiny friendly smile
  const mouthGeo = new THREE.TorusGeometry(0.08, 0.015, 8, 16, Math.PI);
  const mouthMat = new THREE.MeshBasicMaterial({ color: 0xc44569 });
  const mouth = new THREE.Mesh(mouthGeo, mouthMat);
  mouth.position.set(0, -0.18, 0.46);
  mouth.rotation.x = Math.PI - 0.2;
  headNode.add(mouth);

  // 4. Eyes & Blinking Eyelids
  const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const irisMat = new THREE.MeshStandardMaterial({
    color: eyeColor,
    roughness: 0.2,
    metalness: 0.1,
  });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x111111 });

  // Left Eye
  const leftEyeGroup = new THREE.Group();
  leftEyeGroup.position.set(-0.18, 0.03, 0.42);
  const leftWhite = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), eyeWhiteMat);
  leftWhite.scale.set(1, 1.25, 0.5);
  leftEyeGroup.add(leftWhite);

  const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), pupilMat);
  leftPupil.position.set(0, 0, 0.08);
  leftEyeGroup.add(leftPupil);

  const leftIris = new THREE.Mesh(new THREE.RingGeometry(0.05, 0.09, 16), irisMat);
  leftIris.position.set(0, 0, 0.078);
  leftEyeGroup.add(leftIris);

  const eyelidGeo = new THREE.SphereGeometry(0.125, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const eyelidMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.6 });
  const leftEyelid = new THREE.Mesh(eyelidGeo, eyelidMat);
  leftEyelid.position.set(0, 0.02, 0.01);
  leftEyelid.rotation.x = -Math.PI / 2; // Open state
  leftEyeGroup.add(leftEyelid);
  headNode.add(leftEyeGroup);

  // Right Eye
  const rightEyeGroup = new THREE.Group();
  rightEyeGroup.position.set(0.18, 0.03, 0.42);
  const rightWhite = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), eyeWhiteMat);
  rightWhite.scale.set(1, 1.25, 0.5);
  rightEyeGroup.add(rightWhite);

  const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), pupilMat);
  rightPupil.position.set(0, 0, 0.08);
  rightEyeGroup.add(rightPupil);

  const rightIris = new THREE.Mesh(new THREE.RingGeometry(0.05, 0.09, 16), irisMat);
  rightIris.position.set(0, 0, 0.078);
  rightEyeGroup.add(rightIris);

  const rightEyelid = new THREE.Mesh(eyelidGeo, eyelidMat);
  rightEyelid.position.set(0, 0.02, 0.01);
  rightEyelid.rotation.x = -Math.PI / 2;
  rightEyeGroup.add(rightEyelid);
  headNode.add(rightEyeGroup);

  // 5. Hair Styling
  const hairGroup = new THREE.Group();
  // Hair cap
  const hairCapGeo = new THREE.SphereGeometry(0.5, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6);
  const hairCap = new THREE.Mesh(hairCapGeo, hairMat);
  hairCap.position.set(0, 0.04, -0.05);
  hairGroup.add(hairCap);

  if (isZoey) {
    // Zoey's twin crystal curls and soft bangs
    const curlGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const leftCurl = new THREE.Mesh(curlGeo, hairMat);
    leftCurl.position.set(-0.46, -0.08, 0.1);
    hairGroup.add(leftCurl);

    const rightCurl = new THREE.Mesh(curlGeo, hairMat);
    rightCurl.position.set(0.46, -0.08, 0.1);
    hairGroup.add(rightCurl);

    // Cute bangs
    const bangGeo = new THREE.TorusGeometry(0.25, 0.06, 10, 16, Math.PI * 0.7);
    const bang = new THREE.Mesh(bangGeo, hairMat);
    bang.position.set(-0.05, 0.35, 0.42);
    bang.rotation.z = -0.3;
    hairGroup.add(bang);
  } else {
    // Lily's wavy locks and side blossom braid
    const curlGeo = new THREE.CylinderGeometry(0.1, 0.14, 0.45, 12);
    const leftLock = new THREE.Mesh(curlGeo, hairMat);
    leftLock.position.set(-0.45, -0.15, 0.05);
    leftLock.rotation.z = 0.2;
    hairGroup.add(leftLock);

    const rightLock = new THREE.Mesh(curlGeo, hairMat);
    rightLock.position.set(0.45, -0.15, 0.05);
    rightLock.rotation.z = -0.2;
    hairGroup.add(rightLock);

    // Front soft tuft
    const tuftGeo = new THREE.SphereGeometry(0.14, 12, 12);
    const tuft = new THREE.Mesh(tuftGeo, hairMat);
    tuft.position.set(0.08, 0.42, 0.38);
    hairGroup.add(tuft);
  }
  headNode.add(hairGroup);

  // 6. Crown / Tiara
  const crownGroup = new THREE.Group();
  crownGroup.position.set(0, 0.48, 0.1);

  if (isZoey) {
    // 3D Crystal Tiara with 5 sparkling facets
    const crystalMat = new THREE.MeshStandardMaterial({
      color: crownColor,
      roughness: 0.15,
      metalness: 0.7,
      emissive: 0x8ec9f6,
      emissiveIntensity: 0.4,
    });
    const circlet = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.025, 8, 24, Math.PI), crystalMat);
    circlet.rotation.x = Math.PI / 2;
    crownGroup.add(circlet);

    const spikePositions = [-0.18, -0.09, 0, 0.09, 0.18];
    const spikeHeights = [0.12, 0.18, 0.25, 0.18, 0.12];
    spikePositions.forEach((x, i) => {
      const h = spikeHeights[i];
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.04, h, 6), crystalMat);
      cone.position.set(x, h / 2, 0.2);
      crownGroup.add(cone);
    });
  } else {
    // Lily's Crescent Moon & Moonflower Crown
    const goldMat = new THREE.MeshStandardMaterial({
      color: crownColor,
      roughness: 0.25,
      metalness: 0.8,
      emissive: 0xd9b752,
      emissiveIntensity: 0.3,
    });
    const circlet = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.025, 8, 24, Math.PI), goldMat);
    circlet.rotation.x = Math.PI / 2;
    crownGroup.add(circlet);

    // Crescent moon center
    const moonGeo = new THREE.TorusGeometry(0.14, 0.035, 12, 24, Math.PI * 1.3);
    const moon = new THREE.Mesh(moonGeo, goldMat);
    moon.position.set(0, 0.18, 0.22);
    moon.rotation.z = Math.PI * 0.7;
    crownGroup.add(moon);

    // Side flower accents
    const flwMat = new THREE.MeshStandardMaterial({ color: 0xfce7f3, emissive: 0xd8c5f5, emissiveIntensity: 0.4 });
    const leftPetal = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06, 0), flwMat);
    leftPetal.position.set(-0.16, 0.08, 0.22);
    crownGroup.add(leftPetal);

    const rightPetal = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06, 0), flwMat);
    rightPetal.position.set(0.16, 0.08, 0.22);
    crownGroup.add(rightPetal);
  }
  headNode.add(crownGroup);

  // Animation state
  let nextBlinkTime = 2.5;
  let isBlinking = false;
  let blinkProgress = 0;
  let happyTimer = 0;

  function triggerHappyReaction() {
    happyTimer = 2.0; // 2 seconds of joy
  }

  function update(
    time: number,
    pointer: { x: number; y: number },
    mood: string = 'happy',
    prefersReducedMotion: boolean = false
  ) {
    if (prefersReducedMotion) {
      // Resting position in reduced-motion mode
      root.position.y = 0;
      root.rotation.z = 0;
      gownMesh.rotation.z = 0;

      // Slower, gentle head tracking
      const targetRotY = THREE.MathUtils.clamp(pointer.x * 0.4, -0.4, 0.4);
      const targetRotX = THREE.MathUtils.clamp(-pointer.y * 0.25, -0.25, 0.25);
      headNode.rotation.y = THREE.MathUtils.lerp(headNode.rotation.y, targetRotY, 0.05);
      headNode.rotation.x = THREE.MathUtils.lerp(headNode.rotation.x, targetRotX, 0.05);
    } else {
      // 1. Idle Floating & Breathing customized by mood
      let breathRate = 2.0;
      let floatAmp = 0.05;
      let headPitchOffset = 0;
      let headRollOffset = 0;

      if (mood === 'sleepy') {
        breathRate = 0.8; // Calmer, slower slumber breathing
        floatAmp = 0.025;
        headPitchOffset = 0.22; // Clear drowsy nod forward
        headRollOffset = isZoey ? -0.12 : 0.12; // Cute sleepy tilt to the side
      } else if (mood === 'dreamy') {
        breathRate = 1.3;
        floatAmp = 0.07;
        headPitchOffset = -0.22; // Gazing upward at celestial stars
        headRollOffset = isZoey ? 0.08 : -0.08; // Dreamy star sway
      } else if (mood === 'sparkling') {
        breathRate = 3.0;
        floatAmp = 0.08;
      }

      const idleY = Math.sin(time * breathRate) * floatAmp;
      const idleRotZ = Math.sin(time * (breathRate * 0.6)) * (mood === 'sparkling' ? 0.05 : 0.02) + headRollOffset * 0.5;
      root.position.y = idleY;
      root.rotation.z = idleRotZ;

      // Gown gentle sway
      gownMesh.rotation.z = Math.sin(time * (breathRate * 0.9)) * 0.035;

      // 2. Head tracking: Smoothly track pointer (normalized -1 to 1) with mood pitch offset
      const targetRotY = THREE.MathUtils.clamp(pointer.x * (mood === 'sleepy' ? 0.25 : 0.6), -0.65, 0.65);
      const targetRotX = THREE.MathUtils.clamp(-pointer.y * (mood === 'sleepy' ? 0.2 : 0.4) + headPitchOffset, -0.45, 0.45);
      const targetRotZ = headRollOffset + (mood === 'dreamy' ? Math.sin(time * 0.8) * 0.05 : 0);

      const lerpSpeed = mood === 'sleepy' ? 0.03 : mood === 'sparkling' ? 0.12 : 0.08;
      headNode.rotation.y = THREE.MathUtils.lerp(headNode.rotation.y, targetRotY, lerpSpeed);
      headNode.rotation.x = THREE.MathUtils.lerp(headNode.rotation.x, targetRotX, lerpSpeed);
      headNode.rotation.z = THREE.MathUtils.lerp(headNode.rotation.z, targetRotZ, lerpSpeed);
    }

    // 3. Eye pupils tracking
    const pupilTargetX = THREE.MathUtils.clamp(pointer.x * 0.025, -0.02, 0.02);
    const pupilTargetY = THREE.MathUtils.clamp(
      -pointer.y * 0.02 + (mood === 'sleepy' ? -0.015 : mood === 'dreamy' ? 0.02 : 0),
      -0.025,
      0.025
    );
    leftPupil.position.x = pupilTargetX;
    leftPupil.position.y = pupilTargetY;
    rightPupil.position.x = pupilTargetX;
    rightPupil.position.y = pupilTargetY;

    // 4. Blinking Logic (Sleepy = heavy drowsy half-closed eyelids, Sparkling = quick lively blinks)
    const baseEyelidRot = mood === 'sleepy' ? -Math.PI / 8 : -Math.PI / 2; // heavy half-closed drowsy eyes when sleepy

    if (time > nextBlinkTime && !isBlinking) {
      isBlinking = true;
      blinkProgress = 0;
    }

    if (isBlinking) {
      const blinkSpeed = mood === 'sleepy' ? 0.06 : 0.18;
      blinkProgress += blinkSpeed;
      // Close then open
      const blinkAngle = Math.sin(blinkProgress * Math.PI) * (mood === 'sleepy' ? Math.PI / 8 : Math.PI / 2);
      leftEyelid.rotation.x = baseEyelidRot + blinkAngle;
      rightEyelid.rotation.x = baseEyelidRot + blinkAngle;

      if (blinkProgress >= 1.0) {
        isBlinking = false;
        leftEyelid.rotation.x = baseEyelidRot;
        rightEyelid.rotation.x = baseEyelidRot;
        nextBlinkTime = time + (mood === 'sleepy' ? 1.5 : 2.5) + Math.random() * 3.0;
      }
    } else {
      leftEyelid.rotation.x = baseEyelidRot;
      rightEyelid.rotation.x = baseEyelidRot;
    }

    // 5. Crown Sparkle Bob
    const crownSpinSpeed = mood === 'sparkling' ? 4.5 : 2.2;
    crownGroup.rotation.y = Math.sin(time * crownSpinSpeed) * (mood === 'sparkling' ? 0.25 : 0.08);

    // 6. Prop flourish
    const propSpeed = mood === 'sparkling' ? 3.5 : 2.0;
    propGroup.rotation.z = (isZoey ? -0.3 : -0.25) + Math.sin(time * propSpeed) * 0.12;

    // 7. Happy reaction flourish (bounce and spin)
    if (happyTimer > 0) {
      happyTimer -= 0.016;
      root.position.y += Math.abs(Math.sin(happyTimer * 8.0)) * 0.22;
      headNode.rotation.z = Math.sin(happyTimer * 12.0) * 0.15;
    }
  }

  return {
    root,
    headNode,
    leftEyelid,
    rightEyelid,
    leftPupil,
    rightPupil,
    wandOrFlower: propGroup,
    crownGroup,
    gownMesh,
    update,
    triggerHappyReaction,
    isExternalGLB: false,
  };
}

/**
 * Attempt to load an external GLB model if placed by the user,
 * otherwise safely falling back to our rigged 3D princess.
 */
export async function loadCharacterModel(
  type: 'zoey' | 'lily',
  onProgress?: (progress: number) => void
): Promise<RiggedCharacter> {
  const fallback = createRiggedPrincess(type);
  const glbPath = `/assets/characters/${type}/${type}.glb`;

  try {
    const loader = new GLTFLoader();
    return await new Promise<RiggedCharacter>((resolve) => {
      loader.load(
        glbPath,
        (gltf) => {
          // Model successfully loaded!
          const modelRoot = gltf.scene;
          modelRoot.scale.set(1.2, 1.2, 1.2);

          // Find head bone or node
          let foundHead: THREE.Group | null = null;
          modelRoot.traverse((child) => {
            if (
              child.name.toLowerCase().includes('head') ||
              child.name.toLowerCase().includes('neck')
            ) {
              foundHead = child as THREE.Group;
            }
          });

          const headNode = foundHead || (modelRoot as unknown as THREE.Group);

          resolve({
            root: modelRoot,
            headNode,
            leftEyelid: fallback.leftEyelid,
            rightEyelid: fallback.rightEyelid,
            leftPupil: fallback.leftPupil,
            rightPupil: fallback.rightPupil,
            crownGroup: fallback.crownGroup,
            gownMesh: fallback.gownMesh,
            update: (time, pointer, mood) => {
              fallback.update(time, pointer, mood);
            },
            triggerHappyReaction: fallback.triggerHappyReaction,
            isExternalGLB: true,
          });
        },
        (xhr) => {
          if (xhr.total > 0 && onProgress) {
            onProgress(xhr.loaded / xhr.total);
          }
        },
        () => {
          // Fallback seamlessly to the procedural rigged model
          resolve(fallback);
        }
      );
    });
  } catch {
    return fallback;
  }
}
