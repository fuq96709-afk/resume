"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useState } from "react";
import ScrollRevealText from "./ScrollRevealText";

const experiences = [
  {
    date: "2021.06 - 2022.07",
    company: "惠州佳兆业地产有限公司",
    role: "保修工程师（大专实习）",
    body: "负责房屋维保、验收和施工单位协调，参与现场勘查及问题溯源。",
  },
  {
    date: "2022.07 - 2023.09",
    company: "安徽三建工程有限公司",
    role: "施工员",
    body: "参与现场管理、进度控制、质量安全和班组协调，积累多方协作与执行经验。",
  },
  {
    date: "2023.09 - 2024.11",
    company: "深圳市验厂通技术有限公司",
    role: "销售员",
    body: "负责客户开发与维护，业绩保持团队前 10%，参与展会客户拓展和业务沟通。",
  },
  {
    date: "2024.03 - 2024.09",
    company: "华里里寓",
    role: "前台接待（备考兼职）",
    body: "在职期间同步备考并完成本科升学。",
  },
  {
    date: "2025.11 - 至今",
    company: "深圳市耶尼德科技有限公司",
    role: "视频专员（本科实习）",
    body: "从 Temu 产品实拍转向 AIGC 视频制作，参与 TikTok AI 视频制作端从 0 到 1 落地。",
  },
];

function setPointerVariables(event: ReactPointerEvent<HTMLElement>) {
  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateY = ((x / rect.width) - 0.5) * 8;
  const rotateX = ((y / rect.height) - 0.5) * -8;

  element.style.setProperty("--mouse-x", `${x}px`);
  element.style.setProperty("--mouse-y", `${y}px`);
  element.style.setProperty("--rotate-x", `${rotateX}deg`);
  element.style.setProperty("--rotate-y", `${rotateY}deg`);
}

function resetTilt(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--rotate-x", "0deg");
  event.currentTarget.style.setProperty("--rotate-y", "0deg");
}

function updateTimelinePointer(event: ReactPointerEvent<HTMLDivElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--timeline-x", `${event.clientX - rect.left}px`);
}

export default function CareerExperience() {
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="career-page" id="about">
      <div className="career-shell">
        <header className="career-title" data-motion-group>
          <h2 data-motion-heading>ABOUT ME</h2>
          <p>关于我</p>
        </header>

        <div className="career-intro" data-motion-group>
          <figure
            className="career-portrait"
            data-motion-image
            onPointerMove={setPointerVariables}
            onPointerLeave={resetTilt}
          >
            <Image src="/career-workspace.png" alt="付沣在创作工作台前的工作场景" fill sizes="(max-width: 760px) 100vw, 420px" />
          </figure>

          <div className="career-profile" data-motion-card>
            <div className="career-summary">
              <ScrollRevealText className="career-scroll-reveal">
                我是 2026 届本科毕业生， 但我的职业经历比校园生活开始得更早。 过去几年的工作经历， 让我更早接触真实的业务环境， 也让我养成了持续学习和主动解决问题的习惯。
              </ScrollRevealText>
              <ScrollRevealText className="career-scroll-reveal">
                实习进入现公司后， 我从 Temu 产品实拍逐步转向 AIGC 视频制作， 并参与 TikTok AI 视频制作端从 0 到 1 落地， 随后转为正式员工。
              </ScrollRevealText>
              <ScrollRevealText className="career-scroll-reveal">
                现在， 我仍在持续探索 Codex、 Hermes、 Agent 等 AI 工具。 对我来说， AI 不只是一个工具， 我更关注如何让 AI 真正参与工作、 解决问题和提升效率。
              </ScrollRevealText>
            </div>

            <div className="career-evidence" aria-label="工作成果">
              <div><strong>0 到 1</strong><span>TikTok AI 制作端实践</span></div>
              <div><strong>数千条</strong><span>短视频素材制作</span></div>
              <div>
                <strong>20 万+</strong>
                <span>多条作品播放表现</span>
                <a className="career-achievement-link" href="/achievements#achievements">成就 →</a>
              </div>
            </div>

            <div className="career-tags" aria-label="正在实践的方向">
              <span>AIGC 视频</span><span>产品内容</span><span>AI 工作流</span><span>Agent 实践</span>
            </div>
          </div>
        </div>

        <div className="career-timeline-block" id="career" data-motion-group>
          <div className="career-subheading">
            <span>CAREER PATH</span>
            <h3 data-motion-heading>工作经历</h3>
          </div>
          <div className="career-timeline-scroller" data-motion-card data-motion-clip-only>
            <div className="career-timeline-marquee" onPointerMove={updateTimelinePointer}>
              {[0, 1].map((groupIndex) => (
                <div className="career-timeline" aria-hidden={groupIndex === 1} key={groupIndex}>
                  {experiences.map((experience, index) => {
                    const isHovered = hoveredExperience === index;

                    return (
                      <motion.article
                        className="career-timeline-item relative w-full rounded-[20px] bg-white px-[22px] py-[26px] text-left"
                        key={`${groupIndex}-${experience.date}-${experience.company}`}
                        initial={false}
                        animate={{ y: isHovered && !shouldReduceMotion ? -8 : 0 }}
                        transition={{ type: "spring", stiffness: 340, damping: 28, mass: 0.75 }}
                        onHoverStart={() => setHoveredExperience(index)}
                        onHoverEnd={() => setHoveredExperience(null)}
                      >
                      <span className="career-node" aria-hidden="true" />
                      <time>{experience.date}</time>
                      <span className="career-company">{experience.company}</span>
                      <strong className="career-role">{experience.role}</strong>
                        <AnimatePresence initial={false}>
                          {isHovered && (
                            <motion.div
                              className="career-timeline-details"
                              key="details"
                              initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0, y: 10 }}
                              animate={{ height: "auto", opacity: 1, y: 0 }}
                              exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0, y: 8 }}
                              transition={{
                                height: { duration: shouldReduceMotion ? 0 : 0.36, ease: [0.16, 1, 0.3, 1] },
                                opacity: { duration: shouldReduceMotion ? 0 : 0.2 },
                                y: { duration: shouldReduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] },
                              }}
                            >
                              <p>{experience.body}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.article>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

