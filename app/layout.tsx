import type { Metadata } from "next";
import { Onest, PT_Serif } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "付沣 | AIGC 视频作品集",
  description: "付沣的 AIGC 视频制作、短视频内容创作与 AI 工作流实践。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${onest.variable} ${ptSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
