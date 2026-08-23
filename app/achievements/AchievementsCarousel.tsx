"use client";

import DepthCarousel from "../../components/DepthCarousel";

const items = [
  { image: "/achievements/achievement-01.png", alt: "摩托车车灯清洁短视频数据截图" },
  { image: "/achievements/achievement-02.png", alt: "汽车车灯清洁短视频数据截图" },
  { image: "/achievements/achievement-03.png", alt: "汽车车灯产品展示短视频数据截图" },
  { image: "/achievements/achievement-04.png", alt: "车灯修复效果短视频数据截图" },
  { image: "/achievements/achievement-05.png", alt: "车灯修复产品短视频数据截图" },
  { image: "/achievements/achievement-06.png", alt: "粉色汽车车灯修复短视频数据截图" },
  { image: "/achievements/achievement-07.png", alt: "车灯喷涂演示短视频数据截图" },
  { image: "/achievements/achievement-08.png", alt: "家庭场景短视频数据截图一" },
  { image: "/achievements/achievement-09.png", alt: "家庭场景短视频数据截图二" },
  { image: "/achievements/achievement-10.png", alt: "足部护理短视频数据截图" },
  { image: "/achievements/achievement-11.png", alt: "生活方式短视频数据截图" },
];

export default function AchievementsCarousel() {
  return (
    <div className="achievements-carousel-wrap" style={{ height: "500px", position: "relative" }}>
      <DepthCarousel
        items={items}
        depth={220}
        spread={90}
        tilt={22}
        tiltDirection="right"
        perspective={1400}
        visibleCards={4}
        falloff={0.2}
        blur={6}
        autoplay
        loop
      />
    </div>
  );
}
