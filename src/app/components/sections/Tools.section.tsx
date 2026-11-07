import React from "react";
import { cn } from "../../../lib/cn";
import P from "../Text/P";
import Link from "../Link";

interface Props {
  className?: string;
}
const ToolsSection = ({ className }: Props) => {
  return (
    <section className={cn("text-sm sm:w-8/12", className)}>
      {/* <h2 className="text-foreground-primary mb-4 font-semibold">Hi!</h2> */}
      <P className="text-foreground-secondary">
        Design inspired by{" "}
        <Link
          href="https://brittanychiang.com/"
          aria-label="Brittany Portfolio (opens in new tab)"
        >
          Brittany Portfolio.
        </Link>{" "}
        Coded in{" "}
        <Link
          href="https://code.visualstudio.com/"
          aria-label="Visual Studio Code (opens in new tab)"
        >
          Visual Studio Code.
        </Link>{" "}
        Built with{" "}
        <Link
          href="https://nextjs.org"
          aria-label="NextJS (opens in new tab)"
        >
          NextJS
        </Link>{" "}
        and{" "}
        <Link
          href="https://tailwindcss.com"
          aria-label="TailwindCSS (opens in new tab)"
        >
          TailwindCSS.
        </Link>{" "}
        Deployed with{" "}
        <Link
          href="https://pages.github.com"
          aria-label="GitHub Pages (opens in new tab)"
        >
          GitHub Pages.
        </Link>
      </P>
    </section>
  );
};

export default ToolsSection;
