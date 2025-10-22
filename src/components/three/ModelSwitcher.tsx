import {
  PresentationControls,
  type PresentationControlProps,
} from "@react-three/drei";
import { useRef } from "react";
import { Mesh, type Group } from "three";
import MacbookModel16 from "../models/Macbook-16";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MacbookModel14 from "../models/Macbook-14";

type Props = { scale: number; isMobile: boolean };

interface PresentationControlsProps {
  config?: {
    mass?: number;
    tension?: number;
    friction?: number;
  };
}

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group: Group, opacity: number) => {
  if (!group) return;

  group.traverse((child) => {
    // if (child.isMesh) {
    if (child instanceof Mesh) {
      child.material.transparent = true;

      gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
    }
  });
};

const moveGroup = (group: Group, x: number) => {
  if (!group) return;

  gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

export default function ModelSwitcher({ scale, isMobile }: Props) {
  const SCALE_LARGE_DESKTOP = 0.08;
  const SCALE_LARGE_MOBILE = 0.05;

  const smallMacbookRef = useRef<Group | null>(null);
  const largeMacbookRef = useRef<Group | null>(null);

  const showLargeMacbook =
    scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

  useGSAP(() => {
    if (showLargeMacbook) {
      if (smallMacbookRef.current) {
        moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
        fadeMeshes(smallMacbookRef.current, 0);
      }

      if (largeMacbookRef.current) {
        moveGroup(largeMacbookRef.current, 0);
        fadeMeshes(largeMacbookRef.current, 1);
      }
    } else {
      if (smallMacbookRef.current) {
        moveGroup(smallMacbookRef.current, 0);
        fadeMeshes(smallMacbookRef.current, 1);
      }

      if (largeMacbookRef.current) {
        moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);
        fadeMeshes(largeMacbookRef.current, 0);
      }
    }
  }, [scale]);

  const controlsConfig: PresentationControlProps & PresentationControlsProps = {
    snap: true,
    speed: 1,
    zoom: 1,
    // polar: [-Math.PI, Math.PI],
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 0 },
  };

  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
}
