"use client";

import TiltedCard from "../components/TiltedCard/TiltedCard";

export default function HeroTiltedPortrait() {
  return (
    <TiltedCard
      imageSrc="/portrait-web.png"
      altText="付沣的个人形象照"
      containerHeight="100%"
      containerWidth="100%"
      imageHeight="100%"
      imageWidth="100%"
      rotateAmplitude={12}
      scaleOnHover={1.2}
      showMobileWarning={false}
      showTooltip={false}
    />
  );
}

