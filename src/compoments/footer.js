import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import { navbarLink } from "./navbar";

const Footer = ({ data }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="landing-shell site-footer__grid">
        <div className="site-footer__brand">
          <Link to="/" aria-label="Garuda Organizer Home"><img src={Logo} alt="Garuda Organizer" /></Link>
          <p>
            Sarinah Building 12th Floor, Jl. M.H. Thamrin No.11,
            RT.8/RW.4, Gondangdia, Kec. Menteng, Kota Jakarta Pusat,
            Daerah Khusus Ibukota Jakarta
          </p>
        </div>

        <div className="site-footer__column">
          <h2>Our Services</h2>
          {navbarLink.map(item => <Link to={item.link} key={item.link}>{item.name}</Link>)}
        </div>

        <div className="site-footer__column">
          <h2>About</h2>
          <Link to="/portofolio">Our Project</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="site-footer__column site-footer__contact">
          <h2>contact</h2>
          <div className="site-footer__socials">
            <a href="https://www.youtube.com/@garudaorganizer_" target="_blank" rel="noopener noreferrer"><img src="/images/icon/Youtube.png" alt="youtube" /></a>
            <a href="https://www.instagram.com/eo_garudaorganizer" target="_blank" rel="noopener noreferrer"><img src="/images/icon/Instagram.png" alt="instagram" /></a>
          </div>
          <a href={`mailto:${data || ""}`}><img src="/images/icon/Email.png" alt="" />{data}</a>
          <a href="tel:02121231095"><img src="/images/icon/Phone.png" alt="" />021-2123-1095</a>
          <a href="tel:081382237813"><img src="/images/icon/Phone.png" alt="" />0813-8223-7813</a>
        </div>
      </div>
      <div className="landing-shell site-footer__bottom"><span>© Copyright Garuda {year}</span></div>
    </footer>
  );
};

export default Footer;
