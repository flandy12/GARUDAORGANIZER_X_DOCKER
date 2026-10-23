import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";

const navbarLink = [
  { name: "Recruitment Event", link: "/service/recruitment-event" },
  { name: "Corporate Hiring Program", link: "/service/corporate-hiring" },
  { name: "MICE and Activation", link: "/service/mice" },
  { name: "Digital Services", link: "/service/digital-services" },
];

const ChevronIcon = ({ open = false }) => (
  <svg
    className={`site-nav__chevron ${open ? "is-open" : ""}`}
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true">
    <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const hoverTimerRef = useRef(null);

  const closeMenus = useCallback(() => {
    window.clearTimeout(hoverTimerRef.current);
    setMenuOpen(false);
    setServicesOpen(false);
  }, []);

  const openServices = () => {
    if (window.innerWidth <= 820) return;
    window.clearTimeout(hoverTimerRef.current);
    setServicesOpen(true);
  };

  const closeServicesWithDelay = () => {
    if (window.innerWidth <= 820) return;
    window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => setServicesOpen(false), 180);
  };

  useEffect(() => {
    closeMenus();
  }, [location.pathname, closeMenus]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const onPointerDown = event => {
      if (navRef.current && !navRef.current.contains(event.target)) closeMenus();
    };
    const onKeyDown = event => {
      if (event.key === "Escape") closeMenus();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(hoverTimerRef.current);
    };
  }, [closeMenus]);

  useEffect(() => {
    if (!menuOpen || window.innerWidth > 820) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const isActive = path => location.pathname === path;
  const serviceActive = location.pathname.startsWith("/service/");

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`} ref={navRef}>
      <nav className="landing-shell site-nav" aria-label="Main navigation">
        <Link to="/" className="site-nav__brand" aria-label="Garuda Organizer Home">
          <img src="/Garuda.png" alt="Garuda Organizer" />
        </Link>

        <button
          type="button"
          className={`site-nav__toggle ${menuOpen ? "is-open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          aria-label={menuOpen ? "Close main menu" : "Open main menu"}
          onClick={() => setMenuOpen(value => !value)}>
          <span />
          <span />
          <span />
        </button>

        <div className={`site-nav__menu ${menuOpen ? "is-open" : ""}`} id="main-menu">
          <Link className={isActive("/") ? "is-active" : ""} to="/">Home</Link>
          <Link className={isActive("/about") ? "is-active" : ""} to="/about">About</Link>

          <div
            className="site-nav__dropdown"
            onMouseEnter={openServices}
            onMouseLeave={closeServicesWithDelay}>
            <button
              type="button"
              className={`flex justify-between ${serviceActive ? "is-active" : ""}`}
              aria-expanded={servicesOpen}
              aria-controls="service-menu"
              onClick={() => setServicesOpen(value => !value)}>
              Service <ChevronIcon open={servicesOpen} />
            </button>
            <div className={`site-nav__dropdown-menu ${servicesOpen ? "is-open" : ""}`} id="service-menu">
              {navbarLink.map(item => (
                <Link className={isActive(item.link) ? "is-active" : ""} key={item.link} to={item.link}>
                  <span>{item.name}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>

          <Link className={isActive("/portofolio") ? "is-active" : ""} to="/portofolio">Our Project</Link>
          <Link className={`site-nav__contact ${isActive("/contact") ? "is-active" : ""}`} to="/contact">
            Contact <ArrowIcon />
          </Link>
        </div>
      </nav>

      {menuOpen && <button type="button" className="site-nav__backdrop" aria-label="Close main menu" onClick={closeMenus} />}
    </header>
  );
};

export { navbarLink, Navbar };
