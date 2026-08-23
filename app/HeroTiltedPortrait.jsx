"use client";

import TiltedCard from "../components/TiltedCard/TiltedCard";

export default function HeroTiltedPortrait() {
  return (
    <TiltedCard
      imageSrc="/portrait-web.png"
      altText="付沣的个人形象照"
      captionText="付沣 · AIGC 视频创作者"
      containerHeight="100%"
      containerWidth="100%"
      imageHeight="100%"
      imageWidth="100%"
      rotateAmplitude={12}
      scaleOnHover={1.08}
      showMobileWarning={false}
      showTooltip={true}
      displayOverlayContent={true}
      overlayContent={
        <p className="hero-tilted-overlay-text">
          FU FENG <span>AIGC CREATOR</span>
        </p>
      }
    />
  );
}

