import { useEffect } from "react";

function useCardEventListeners(): void {
  useEffect(() => {
    const container = document.querySelectorAll<HTMLElement>(".card-container");

    container.forEach((card) => {
      card.style.willChange = "transform";

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const dampenFactor = 0.1;
        const rotateY = -x * dampenFactor;
        const rotateX = y * dampenFactor;

        const maxRotate = 20;
        const clampedRotateY = Math.min(
          Math.max(rotateY, -maxRotate),
          maxRotate,
        );
        const clampedRotateX = Math.min(
          Math.max(rotateX, -maxRotate),
          maxRotate,
        );

        card.style.transform = `perspective(350px) rotateX(${clampedRotateX}deg) rotateY(${clampedRotateY}deg)`;
        card.style.transition = "transform 0.1s";
      };

      const handleMouseOut = () => {
        card.style.transform = "perspective(350px) rotateY(0deg) rotateX(0deg)";
        card.style.transition = "transform 0.5s";
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseout", handleMouseOut);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseout", handleMouseOut);
      };
    });
  }, []);
}

export default useCardEventListeners;
