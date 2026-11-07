import { FiExternalLink } from "react-icons/fi";

import P from "../Text/P";
import Image from "next/image";

interface Props {
  className?: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  thumbnail: string;
}
const projects: Project[] = [
  {
    title: "Jouzu Speak",
    description:
      "A personalized Japanese AI tutor that helps you practice conversational Japanese whenever you want.",

    technologies: ["Google Cloud Platform", "OpenAI", "Python"],
    link: "https://www.jouzuspeak.com/",
    thumbnail: "/jouzu.webp",
  },
  {
    title: "React Smartbanner Package",
    description: "A React package for displaying custom smartbanners",

    technologies: ["React", "Typescript", "Tailwind", "NPM"],
    link: "https://www.npmjs.com/package/custom-react-smartbanner",
    thumbnail: "/smartbanner.svg",
  },
  {
    title: "Shareculator",
    description: "Expense Calculator for Multiple Members Party",

    technologies: ["React", "Typescript", "Tailwind", "Netlify"],
    link: "https://www.shareculator.com/",
    thumbnail: "/shareculator.webp",
  },
  {
    title: "Online Wedding Invitation",
    description:
      "A wedding website for my friend to make it easier for guests to RSVP and for us to manage the guest list.",
    technologies: ["Google Sheets API", "Google Maps API", "i18n"],
    link: "https://www.dev.parkandrotela.com/",
    thumbnail: "/wedding.webp",
  },
];
const ProjectSection = ({ className }: Props) => {
  return (
    <section id="projects" className={className}>
      <h2 className="text-foreground-primary mb-4 font-semibold">Projects</h2>
      <ul className="group/list">
        {projects.map((proj, index) => (
          <li className="mb-12" key={`project-${index}`}>
            <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 hover:cursor-pointer">
              {/* for bg color when hover */}
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-100/20 dark:lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
              {/* left */}
              <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-foreground-secondary sm:col-span-2">
                <Image
                  alt={proj.title}
                  src={proj.thumbnail}
                  width={200}
                  height={120}
                  className="rounded-md"
                />
              </header>
              {/* right */}
              <div className="z-10 sm:col-span-6">
                <div>
                  <h3 className="text-foreground-primary font-medium leading-snug ">
                    <a
                      href={proj.link}
                      target="_blank"
                      aria-label={`${proj.title}(opens in new tab))`}
                      className="inline-flex items-baseline font-medium leading-tight text-foreground-primary hover:text-brand-primary focus-visible:text-brand-primary  group/link text-base"
                      rel="noreferrer noopener"
                    >
                      {/* make the entire card a link */}
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                      {proj.title}
                      <FiExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                    </a>
                  </h3>

                  <P className="mt-2 text-sm leading-normal text-foreground-secondary">
                    {proj.description}
                  </P>
                  <ul
                    className="mt-2 flex flex-wrap"
                    aria-label="Technologies used"
                  >
                    {proj.technologies.map((tech, subIndex) => (
                      <li
                        key={`project-tech-${index}-${subIndex}`}
                        className="mr-1.5 mt-2"
                      >
                        <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-brand-primary">
                          {tech}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default ProjectSection;
