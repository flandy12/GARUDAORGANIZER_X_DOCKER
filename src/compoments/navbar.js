import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const navbarLink = [
  { name: "Recruitment Event", link: "/service/recruitment-event" },
  { name: "Corporate Hiring Program", link: "/service/corporate-hiring" },
  { name: "MICE and Activation", link: "/service/mice" },
  { name: "Digital Services", link: "/service/digital-services" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const onPointerDown = event => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const isActive = path => location.pathname === path;

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
          aria-label="Open main menu"
          onClick={() => setMenuOpen(value => !value)}>
          <span />
          <span />
          <span />
        </button>

        <div className={`site-nav__menu ${menuOpen ? "is-open" : ""}`} id="main-menu">
          <Link className={isActive("/") ? "is-active" : ""} to="/">Home</Link>
          <Link className={isActive("/about") ? "is-active" : ""} to="/about">About</Link>
          <div className="site-nav__dropdown">
            <button type="button" aria-expanded={servicesOpen} onClick={() => setServicesOpen(value => !value)}>
              Service <span aria-hidden="true">⌄</span>
            </button>
            <div className={`site-nav__dropdown-menu ${servicesOpen ? "is-open" : ""}`}>
              {navbarLink.map(item => <Link key={item.link} to={item.link}>{item.name}</Link>)}
            </div>
          </div>
          <Link className={isActive("/portofolio") ? "is-active" : ""} to="/portofolio">Our Project</Link>
          <Link className="site-nav__contact" to="/contact">Contact <span aria-hidden="true">↗</span></Link>
        </div>
      </nav>
    </header>
  );
};

export { navbarLink, Navbar };
