import { useMediaQuery } from "react-responsive";
import { performanceImages, performanceImgPositions } from "../constants";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Performance() {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      // text animation fade in and move up as it enters view
      gsap.fromTo(
        ".content p",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          // duration: 0.8,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".content p",
            start: "top bottom",
            end: "top center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      if (isMobile) return;

      const tl = gsap.timeline({
        defaults: { ease: "power1.inOut", duration: 2, overwrite: "auto" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1, // sync the animation with the scroll direct sync
          invalidateOnRefresh: true, // gsap will recalculate trigger points whenever a screen gets resized.
        },
      });

      performanceImgPositions.forEach((pos) => {
        if (pos.id === "p5") return;

        const selector = `.${pos.id}`;

        const vars: {
          left?: string;
          right?: string;
          bottom?: string;
          transform?: gsap.TweenValue | undefined;
        } = {};

        if (typeof pos.left === "number") vars.left = `${pos.left}`;
        if (typeof pos.right === "number") vars.right = `${pos.right}`;
        if (typeof pos.bottom === "number") vars.bottom = `${pos.bottom}`;

        // if (pos.transform) vars.transform = pos.transform;

        tl.to(selector, vars, 0);
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );
  // limit gsap queries to work only within this component
  // whenever isMobile change, recalculate the positions

  return (
    <section ref={sectionRef} id="performance">
      <h2>Next-level graphics performance. Game on.</h2>

      <div className="wrapper">
        {performanceImages.map((item, index) => (
          <img
            key={index}
            src={item.src}
            className={item.id}
            alt={item.id || `Performance Image #${index + 1}`}
          />
        ))}
      </div>

      <div className="content">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up
          with your imagination. The M4 family of chips features a GPU with a
          second-generation hardware-accelerated ray tracing engine that renders
          images faster, so{" "}
          <span className="text-white">
            gaming feels more immersive and realistic than ever.
          </span>{" "}
          And Dynamic Caching optimizes fast on-chip memory to dramatically
          increase average GPU utilization — driving a huge performance boost
          for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
}
