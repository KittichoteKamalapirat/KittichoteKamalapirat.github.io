import { ReactNode } from "react";
import { AiFillProfile } from "react-icons/ai";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { cn } from "../../../lib/cn";
import { cvLink, githubLink, linkedInLink } from "../../constants/links";

interface Props {
  className?: string;
}

interface Social {
  ariaLabel: string;
  href: string;
  icon: ReactNode;
}

const socials: Social[] = [
  {
    ariaLabel: "LinkedIn",
    href: linkedInLink,
    icon: (
      <FaLinkedin className="w-6 h-6 hover:text-foreground-interactive-hover" />
    ),
  },
  {
    ariaLabel: "Github",
    href: githubLink,
    icon: <FaGithub className="w-6 h-6 hover:text-foreground-interactive-hover" />,
  },
  {
    ariaLabel: "Resume",
    href: cvLink,
    icon: (
      <AiFillProfile className="w-6 h-6 hover:text-foreground-interactive-hover" />
    ),
  },
];
const SocialSection = ({ className }: Props) => {
  return (
    <section className={cn("flex items-center", className)}>
      <ul className="flex items-center">
        {socials.map((social, index) => (
          <li className="mr-5 text-xs" key={`social-${index}`}>
            <a
              href={social.href}
              className={cn("", className)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.ariaLabel}(opens in a new tab)`}
            >
              <div className="text-foreground-interactive-enable">
                {social.icon}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default SocialSection;
