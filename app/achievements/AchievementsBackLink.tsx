"use client";

import Link from "next/link";

export default function AchievementsBackLink() {
  return (
    <Link
      className="achievements-back"
      href="/"
      onClick={(e) => {
        e.preventDefault();
        window.location.href = "/#about";
      }}
    >
      ← 返回关于我
    </Link>
  );
}