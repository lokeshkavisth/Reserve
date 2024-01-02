import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter, FaHashnode } from "react-icons/fa6";
import Logo from "./Logo";
import { footer } from "../data/data.json";

const social = [
  {
    name: "twitter",
    href: "https://twitter.com/lokeshkavisth",
    icon: <FaXTwitter />,
  },
  {
    name: "linkedIn",
    href: "https://www.linkedin.com/in/lokeshkavisth/",
    icon: <FaLinkedin />,
  },
  {
    name: "hashnode",
    href: "https://lokeshkavisth.hashnode.dev/",
    icon: <FaHashnode />,
  },
  {
    name: "github",
    href: "https://github.com/lokeshkavisth/Reserve",
    icon: <FaGithub />,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border-t">
      <article className="max-w-7xl mx-auto py-4 px-2">
        <section className="flex flex-col sm:flex-row justify-between border-b py-4">
          <Logo />
          <nav className="flex gap-4">
            <div>
              <h3 className="mb-1 text-base">Resources</h3>
              <ul>
                {footer.resources.map(({ text, href }) => (
                  <li
                    key={text}
                    className="capitalize hover:text-blue-500 text-gray-500"
                  >
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-1 text-base">Follow us</h3>
              <ul>
                {footer.follow_us.map(({ text, href }) => (
                  <li
                    key={text}
                    className="capitalize hover:text-blue-500 text-gray-500"
                  >
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-1 text-base">Legal</h3>
              <ul>
                {footer.legal.map(({ text, href }) => (
                  <li
                    key={text}
                    className="capitalize hover:text-blue-500 text-gray-500"
                  >
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </section>

        <section className="pt-4 flex flex-col sm:flex-row gap-2 items-center justify-between">
          <p>&copy; {currentYear} Reserve™. All Rights Reserved.</p>
          <nav>
            <ul className="flex items-center gap-4">
              {social.map(({ name, href, icon }) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </article>
    </footer>
  );
};

export default Footer;
