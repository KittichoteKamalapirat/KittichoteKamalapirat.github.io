import { FiExternalLink } from "react-icons/fi";

import P from "../Text/P";
import Image from "next/image";

interface Props {
  className?: string;
}

interface Blog {
  title: string;
  link: string;
  description: string;
  thumbnail: string;
}
const blogs: Blog[] = [
  {
    title:
      "The Cleanest Way to Support Dark Mode using CSS Variables and Tailwind",
    description:
      "To support dark mode with Tailwind, you would usually write something like this according to the docs.",
    link: "https://dev.to/kittishane/the-cleanest-way-to-support-dark-mode-using-css-variables-and-tailwind-4po0",
    thumbnail: "/blog-dark-mode.webp",
  },
];
const BlogSection = ({ className }: Props) => {
  return (
    <section id="writing" className={className}>
      <h2 className="text-foreground-primary mb-4 font-semibold">Writing</h2>
      <ul className="group/list">
        {blogs.map((blog, index) => (
          <li className="mb-12" key={`Blog-${index}`}>
            <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 hover:cursor-pointer">
              {/* for bg color when hover */}
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-100/20 dark:lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
              {/* left */}
              <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-foreground-secondary sm:col-span-2">
                <Image
                  alt={blog.title}
                  src={blog.thumbnail}
                  width={200}
                  height={120}
                  className="rounded-md object-none w-[200px] h-[120px]"
                />
              </header>
              {/* right */}
              <div className="z-10 sm:col-span-6">
                <div>
                  <h3 className="text-foreground-primary font-medium leading-snug ">
                    <a
                      href={blog.link}
                      target="_blank"
                      aria-label={`${blog.title}(opens in new tab))`}
                      className="inline-flex items-baseline font-medium leading-tight text-foreground-primary hover:text-brand-primary focus-visible:text-brand-primary  group/link text-base"
                      rel="noreferrer noopener"
                    >
                      {/* make the entire card a link */}
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                      {blog.title}
                      <FiExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                    </a>
                  </h3>

                  <P className="mt-2 text-sm leading-normal text-foreground-secondary hidden lg:block">
                    {blog.description}
                  </P>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default BlogSection;
