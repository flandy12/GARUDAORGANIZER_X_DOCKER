import { Link, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";

const navbarLink = [
  {
    name: "Recruitment Event",
    link: "/service/recruitment-event",
  },
  {
    name: "Corporate Hiring Program",
    link: "/service/corporate-hiring",
  },
  {
    name: "MICE and Activation",
    link: "/service/mice",
  },
  {
    name: "Digital Services",
    link: "/service/digital-services",
  },
];

const Navbar = () => {
  const [IconHamburger, setIconHamburger] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState(null);

  const dropdownNavbar = e => {
    if (activeDropdown === true) {
      setActiveDropdown(false);
    } else {
      setActiveDropdown(true);
    }
  };

  const dropdownMobile = e => {
    if (IconHamburger === true) {
      setIconHamburger(false);
    } else {
      setIconHamburger(true);
    }
  };

  const RemoveDropdown = () => {
    setActiveDropdown(false);
    setIconHamburger(false);
  };

  useEffect(() => {
    setUrl(location.pathname);
    window.addEventListener("scroll", function (e) {
      RemoveDropdown();
    });
  }, [location]);

  return (
    <>
      <nav className="bg-white-50 border-gray-200 bg-blue-950 ">
        <div className="container flex flex-wrap items-center justify-between mx-auto xl:px-0 lg:px-0 md:px-5 px-5">
          <Link
            to="/"
            className="flex items-center xl:px-5 lg:px-5 md:px-5 px-0 py-2 my-2">
            <picture>
              <source srcSet={"/Garuda.png"} type="image/webp" />
              <img
                src={"/Garuda.png"}
                className="xl:h-16 lg:h-16 h-10 p-0 m-0"
                alt="Logo-Garuda"
              />
            </picture>
          </Link>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-dropdown"
            aria-expanded="false"
            onClick={dropdownMobile}>
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              IconHamburger === true ? "" : "hidden"
            } w-full md:block md:w-auto `}
            id="navbar-dropdown">
            <ul
              className={`flex flex-col xl:justify-between lg:justify-between md:lg:justify-between justify-normal xl:items-center lg:items-center md:items-center font-medium p-4  mt-4 xl:space-x-10 lg:space-x-10 md:space-x-5 rtl:space-x-reverse md:flex-row  ${
                IconHamburger === true
                  ? "xl:space-y-0 lg:space-y-0 md:space-y-0 space-y-4"
                  : ""
              }`}>
              <li>
                <Link
                  to="/"
                  className={`block py-2 px-3 ${
                    url === "/" ? "text-white" : "text-gray-300"
                  } rounded md:bg-transparent md:p-0`}
                  aria-current="page"
                  onClick={RemoveDropdown}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`block py-2 px-3 ${
                    url === "/about" ? "text-white" : "text-gray-300"
                  } rounded md:bg-transparent md:p-0`}
                  aria-current="page"
                  onClick={RemoveDropdown}>
                  About
                </Link>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 px-3 text-gray-300 rounded  md:border-0  md:p-0 md:w-auto  "
                  onClick={dropdownNavbar}>
                  Service{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownNavbar"
                  className={`z-20 ${
                    activeDropdown === true
                      ? `${
                          IconHamburger === true
                            ? "xl:w-max lg:w-max w-full xl:absolute lg:absolute m-0 h-max "
                            : "absolute m-0 h-max xl:inset-y-20 lg:inset-y-20 md:inset-y-14 "
                        }`
                      : "hidden"
                  } font-normal bg-white divide-y divide-gray-100 rounded-lg shadow  `}>
                  <ul
                    className="py-2 text-sm text-gray-700 "
                    aria-labelledby="dropdownLargeButton">
                    {navbarLink.map((value, key) => (
                      <li key={key}>
                        <Link
                          to={`${value.link}`}
                          className="block px-4 py-2 hover:bg-blue-500 hover:text-white"
                          reloadDocument
                          onClick={RemoveDropdown}>
                          {value.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li>
                <Link
                  to="/portofolio"
                  className={`block x hover:text-white ${
                    url === "/portofolio" ? "text-white" : "text-gray-300"
                  } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 xl:px-0 lg:px-0 px-3`}
                  onClick={RemoveDropdown}>
                  Our Project
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`block bg-blue-600 hover:text-blue-600 hover:bg-white ${
                    url === "/contact" ? "text-white" : "text-white"
                  } rounded md:border-0 xl:px-10  lg:px-10 md:px-10 px-3 py-2 text-white `}
                  onClick={RemoveDropdown}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export {navbarLink, Navbar};
