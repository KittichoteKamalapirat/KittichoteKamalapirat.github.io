import { IoMdClose } from "react-icons/io";
import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useState } from "react";
import { cn } from "../../../lib/cn";
import TimeMachine from ".";

export interface Version {
  number: number;
  link: string;
  thumbnail: string;
}

const versions: Version[] = [
  {
    number: 4,
    link: "https://kittichotekamalapirat.github.io/",
    thumbnail: "/v4.webp",
  },
  {
    number: 3,
    link: "https://kittichote.vercel.app/",
    thumbnail: "/v3.webp",
  },
  {
    number: 2,
    link: "https://v2.kittishane.com/",
    thumbnail: "/v2.webp",
  },
  {
    number: 1,
    link: "https://v1.kittishane.com/",
    thumbnail: "/v1.webp",
  },
];

interface Props {
  close: () => void;
  className?: string;
  "aria-hidden"?: boolean;
}

const TimeMachineOverlay = ({ close, className, ...rest }: Props) => {
  const [currentVersion, setCurrentVersion] = useState<number>(
    versions.length
  ); // 1-based

  const enablePrev = currentVersion >= 2;
  const enableNext = currentVersion <= versions.length - 1;

  const handleNext = () => {
    if (!enableNext) return;
    setCurrentVersion(currentVersion + 1);
  };
  const handlePrev = () => {
    if (!enablePrev) return;
    setCurrentVersion(currentVersion - 1);
  };
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...rest}
    >
      <button
        onClick={close}
        aria-label="Close time machine"
        className="top-4 right-4 absolute"
      >
        <IoMdClose className="w-8 h-8 text-foreground-primary" />
      </button>
      <TimeMachine versions={versions} currentVersion={currentVersion} />

      <div
        className={cn(
          "mb-12 flex items-center md:flex-col  gap-4 fixed",
          "bottom-4 left-1/2 -translate-x-1/2",
          "md:right-4 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:left-auto"
        )}
      >
        <button
          onClick={handlePrev}
          aria-label="Previous version"
          disabled={!enablePrev}
          className="disabled:opacity-50 text-foreground-primary"
        >
          <FaChevronUp className="hidden md:block" />
          <FaChevronLeft className="md:hidden" />
        </button>
        <span className="text-foreground-primary">V.{currentVersion}</span>
        <button
          onClick={handleNext}
          aria-label="Next version"
          disabled={!enableNext}
          className="disabled:opacity-50 text-foreground-primary"
        >
          <FaChevronDown className="hidden md:block" />
          <FaChevronRight className="md:hidden" />
        </button>
      </div>
    </div>
  );
};
export default TimeMachineOverlay;
