"use client";

import Logo from "../../../assets/logo.svg";

import { useEffect, useState } from "react";
import { cn } from "../../../lib/cn";
import ColorThemeToggler from "../ColorThemeToggler";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-[100]", // make fixed so can set content 100% with top padding
        "border-gray-200",
        "lg:transition-none lg:translate-x-0 lg:translate-y-0", // hide in mobile, not in desktop
        "transition-transform duration-500 ease-in-out",
        isScrolled // hide in mobile
          ? "translate-y-[-80px]"
          : " translate-y-0"
      )}
    >
      <div className="mx-auto flex flex-wrap items-center justify-between p-4">
        <Logo className={cn("w-8 h-8 text-foreground-primary")} />

        <ColorThemeToggler />
      </div>
    </nav>
  );
};
export default Navbar;
