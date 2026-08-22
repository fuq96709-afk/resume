import type { Metadata } from "next";
import { Onest, Public_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "./CustomCursor";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["900"],
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
      <body className={`${onest.variable} ${publicSans.variable}`}>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
