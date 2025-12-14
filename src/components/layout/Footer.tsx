import Logo from "@/assets/icons/logo";

function Footer() {
  return (
    <div>
      <footer className="">
        <div className="mx-auto container max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-foreground lg:flex lg:items-start lg:gap-8">
            <Logo></Logo>

            <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
              {/* NEWS SECTION */}
              <div className="col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Get the latest news!
                </h2>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>

              {/* EMAIL FORM */}
              <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
                <form className="w-full">
                  <label htmlFor="UserEmail" className="sr-only">
                    Email
                  </label>

                  <div className="border border-gray-100 p-2 focus-within:ring-3 sm:flex sm:items-center sm:gap-4 dark:border-gray-800">
                    <input
                      type="email"
                      id="UserEmail"
                      placeholder="john@rhcp.com"
                      className="w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm dark:bg-gray-900 dark:text-white"
                    />

                    <button className="mt-1 w-full bg-teal-500 px-6 py-3 text-sm font-bold tracking-wide text-white uppercase transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0">
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>

              {/* SECTIONS */}
              {[
                {
                  title: "Services",
                  links: [
                    "1on1 Coaching",
                    "Company Review",
                    "Accounts Review",
                    "HR Consulting",
                    "SEO Optimisation",
                  ],
                },
                {
                  title: "Company",
                  links: ["About", "Meet the Team", "Accounts Review"],
                },
                {
                  title: "Helpful Links",
                  links: ["Contact", "FAQs", "Live Chat"],
                },
                {
                  title: "Legal",
                  links: [
                    "Accessibility",
                    "Returns Policy",
                    "Refund Policy",
                    "Hiring-3 Statistics",
                  ],
                },
                {
                  title: "Downloads",
                  links: ["Marketing Calendar", "SEO Infographics"],
                },
              ].map((section, idx) => (
                <div key={idx} className="col-span-2 sm:col-span-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {section.title}
                  </p>

                  <ul className="mt-6 space-y-4 text-sm">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* SOCIAL ICONS */}
              <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end">
                {/* FACEBOOK */}
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12..."
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                {/* Instagram */}
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path fillRule="evenodd" d="..." clipRule="evenodd" />
                    </svg>
                  </a>
                </li>

                {/* Twitter */}
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="..." />
                    </svg>
                  </a>
                </li>

                {/* GitHub */}
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path fillRule="evenodd" d="..." clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
