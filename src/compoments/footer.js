import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import { navbarLink } from "./navbar";

const Footer = props => {
  let get_years = new Date();
  get_years = get_years.getFullYear();

  const Footer = () => {
    return (
      <footer className="footer-master footer-text text-slate-300 bg-blue-950 h-full">
        <div className="container mx-auto">
          <div className="px-8 py-20 ">
            <div className="xl:grid lg:grid md:grid xl:grid-cols-4 md:grid-cols-3 grid-cols-4 block gap-10 justify-between">
              <div className="mb-6 md:mb-0">
                <Link
                  to="/"
                  className="flex items-center xl:justify-start lg:justify-start md:justify-start justify-start text-center mb-4">
                  <picture>
                    <source srcSet={Logo} type="image/webp" />
                    <img
                      src={Logo}
                      alt="soulofjakarta.id"
                      className="h-16 mr-3 w-full"
                    />
                  </picture>
                </Link>
                <div className="footer-text space-y-5">
                  <div className="flex gap-10 border-t-2  py-4">
                    <p className=" font-sm">
                      Sarinah Building 12th Floor, Jl. M.H. Thamrin No.11,
                      RT.8/RW.4, Gondangdia, Kec. Menteng, Kota Jakarta Pusat,
                      Daerah Khusus Ibukota Jakarta
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-6 md:mb-0 space-y-3">
                <p className="xl:text-2xl lg:text-2xl md:text-2xl text-xl font-semibold text-white capitalize">
                  {" "}
                  Our Services{" "}
                </p>
                <div className="w-100  h-full my-3 space-y-3 flex flex-col">
                  {navbarLink.map((value, key) => (
                    <a href={`${value.link}`}>{value.name}</a>
                  ))}
                </div>
              </div>

              <div className="mb-6 md:mb-0 space-y-3 ">
                <p className="xl:text-2xl lg:text-2xl md:text-2xl text-xl font-semibold text-white capitalize">
                  {" "}
                  About{" "}
                </p>
                <div className="w-100  h-full footer-text my-3 ">
                  <div className="">
                    <Link to={"/portofolio"}>
                      <p className="my-3">Our Project</p>
                    </Link>
                    <Link to={"/contact"}>
                      <p className="my-3">Contact Us</p>
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <div className="wrapper-icon">
                  <div>
                    <p className="xl:text-2xl lg:text-2xl md:text-2xl text-xl font-semibold text-white capitalize">
                      contact
                    </p>
                  </div>
                  <div className="flex  mt-5 gap-4">
                    <Link
                      to="https://www.youtube.com/@garudaorganizer_"
                      target="_blank"
                      rel="noopener">
                      <picture>
                        <source
                          srcSet="/images/icon/Youtube.png"
                          type="image/webp"
                        />
                        <img
                          src="/images/icon/Youtube.png"
                          alt="youtube"
                          className="icon w-8"
                        />
                      </picture>
                    </Link>
                    <Link
                      to="https://www.instagram.com/eo_garudaorganizer"
                      target="_blank"
                      rel="noopener">
                      <picture>
                        <source
                          srcSet="/images/icon/Instagram.png"
                          type="image/webp"
                        />
                        <img
                          src={`/images/icon/Instagram.png`}
                          alt="tik-tok"
                          className="icon w-8"
                        />
                      </picture>
                    </Link>
                  </div>

                  <div className="space-y-3 mt-10">
                    <div className="flex items-center   gap-2">
                      <picture>
                        <source
                          srcSet="/images/icon/Email.png"
                          type="image/webp"
                        />
                        <img
                          src="/images/icon/Email.png"
                          alt="Icon-Email"
                          className="w-5"
                        />
                      </picture>
                      <p className="font-semibold ">{props.data}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <picture>
                        <source
                          srcSet="/images/icon/Phone.png"
                          type="image/webp"
                        />
                        <img
                          src="/images/icon/Phone.png"
                          alt="Icon-Phone"
                          className="w-5"
                        />
                      </picture>
                      <p className="font-semibold ">021-2123-1095</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <picture>
                        <source
                          srcSet="/images/icon/Phone.png"
                          type="image/webp"
                        />
                        <img
                          src="/images/icon/Phone.png"
                          alt="Icon-Phone"
                          className="w-5"
                        />
                      </picture>
                      <p className="font-semibold "> 0813-8223-7813</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-start gap-5 bg-blue-950">
          <div className="container mx-auto py-2 px-5 my-0 flex flex-col justify-center">
            <hr className="my-6 border-gray-300  " />
            <span className="text-sm justify-center text-center">
              © Copyright Garuda {get_years}
            </span>
          </div>
        </div>
      </footer>
    );
  };

  return <Footer />;
};

export default Footer;
