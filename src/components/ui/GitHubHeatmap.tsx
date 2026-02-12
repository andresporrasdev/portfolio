"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { profile } from "@/data/profile";

export function GitHubHeatmap() {
  const { theme } = useTheme();

  const colorScheme = theme === "dark" ? "dark" : "light";

  return (
    <div className="react-github-calendar overflow-x-auto">
      <GitHubCalendar
        username={profile.github}
        colorScheme={colorScheme}
        blockSize={12}
        blockMargin={4}
        fontSize={12}
        theme={{
          dark: ["#1e1e2e", "#3b2d7a", "#5b44c0", "#6c63ff", "#a78bfa"],
          light: ["#f0f0f5", "#d4d0ff", "#a78bfa", "#6c63ff", "#4c3fbf"],
        }}
      />
    </div>
  );
}
