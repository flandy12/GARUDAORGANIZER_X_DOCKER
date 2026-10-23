import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";

import CountUp from "react-countup";

// or only core styles
import "@splidejs/react-splide/css/core";
import { useEffect, useState } from "react";
import CallApi from "../api/Api";
import Portfolio from "../compoments/portofolio";
import SEO from "../compoments/seo";
import SkeletonPortofolio from "../compoments/skeleton";
import { Loading } from "../compoments/loading";
import { Link } from "react-router-dom";
import { createMarkup, scrollToTop } from "../compoments/htmlTag";

//Sweet Alert
import Swal from 'sweetalert2/dist/sweetalert2.js';

const HomePage = () => {
  const [count, setCount] = useState(false);
  const [banner, setBanner] = useState([]);
  const [achievement, setAchievement] = useState([]);
  const [partner, setPartner] = useState([]);
  const [project, setProject] = useState([]);
  const [sector, setSector] = useState([]);
  const [service, setService] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const [why_choose_us, setWhyChooseUs] = useState([]);
  const [why_choose_us_other_images, setWhyChooseUsOtherImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComponent, setShowComponent] = useState(true);

  const handleScrollAnimation = () => {
    const scrollElements = document.querySelectorAll(".animations-element");
    scrollElements.forEach(el => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      }
    });
  };

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = element => {
    const classAnimation = element.getAttribute("data-animation");
    const classAnimationCount = element.getAttribute("data-count");
    if (classAnimation) {
      element.classList.add(classAnimation);
    }
    if (classAnimationCount) {
      setCount(true);
    }
  };

  useEffect(() => {
    // Animation Scroll
    window.addEventListener("scroll", function (e) {
      handleScrollAnimation();
    });

    CallApi("home", "GET").then(ressponse => {
      scrollToTop();
      if (ressponse.success === true) {
        setLoading(false);
        setBanner(ressponse.results.banner);
        setAchievement(ressponse.results.achievement);
        setPartner(ressponse.results.partner);
        setProject(ressponse.results.project);
        setSector(ressponse.results.sector);
        setService(ressponse.results.service);
        setTestimonial(ressponse.results.testimonial);
        setWhyChooseUs(ressponse.results.why_choose_us);
        setWhyChooseUsOtherImages(ressponse.results.why_choose_us_other_images);


        Swal.fire({
          title: "MOHON HATI-HATI!",
          html: "<p class='text-center'>Garuda Organizer tidak pernah menyelenggarakan acara rekrutmen dengan iming-iming hadiah/bonus/komisi/bentuk apapun serta tidak pernah menggunakan nama/brand lain selain daripada <b> Garuda Organizer (PT Garuda Nusantara Kencana)</b> atau <b>Mega Career Expo</b>. Apabila ada yang menggunakan brand diatas dengan tambahan embel-embel pada brand tersebut, <br/><b>itu bukan bagian dari kami</b>. Harap berhati-hati.</p>",
          icon: "warning",
          iconColor: "#0E1663",
          showCloseButton: true,
          background: "#fff",
          backdrop: `
            rgba(0,0,123,0.4)
          `
        }).then((result) => {
          // Jika tombol OK ditekan atau modal ditutup, sembunyikan komponen
          setShowComponent(false);
        });


      } else {
        alert("Error Page");
      }
    });
  }, []);

  const Testimoni = props => {
    const VideoTestimoni = () => {
      const [videoClip, setVideoClip] = useState(0);

      const onClickVideo = e => {
        // setVideoClip();
        window.open(e.target.getAttribute("data-target-video"), "_blank");
      };

      return (
        <div className="rounded space-y-4 text-center relative">
          <div className="xl:space-y-5 lg:space-y-5 space-y-2 xl:px-28 lg:px-28 px-0">
            <div className="flex justify-center mb-10">
              <div
                className="justify-center text-blue-600 text-sm font-bold leading-6 tracking-wide uppercase whitespace-nowrap items-stretch bg-sky-100 px-4 py-3 rounded-lg self-start max-w-auto animations-element"
                data-animation="fade-in-fwd">
                From Our Happy Customers
              </div>
            </div>

            <h2 className="text-slate-700 xl:text-5xl lg:text-3xl text-3xl font-bold xl:leading-[53px] lg:leading-[39px] leading-[39px] tracking-normal xl:px-30 lg:px-30 px-4 ">
              Don't take our word for it. See what customers are saying about
              us.
            </h2>
            <p className="px-5 xl:px-32 lg:px-32 xl:mx-10 lg:mx-0 mx-0 xl:pb-0 lg:pb-0 pb-5 text-lg italic">
              We have held various events with various themes, both for private
              and government agencies. Our success creates unforgettable
              experiences.
            </p>
          </div>

          <div
            className={`flex flex-wrap xl:grid lg:grid md:grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2  xl:gap-5 lg:gap-5 gap-8 first-letter:gap-4 items-center place-content-center text-left z-gray-700 xl:pt-10 lg:pt-10 pt-5`}>
            {props.data !== "[]" ? (
              props.data.map((value, keys) => (
                <div className={`w-full h-full `} key={keys}>
                  <div
                    className={`grid place-content-center relative animations-element`}
                    data-animation="fade-in-fwd-2">
                    {value.image !== "" ? (
                      <picture>
                        <source
                          srcSet={`${process.env.REACT_APP_URL_IMG}${value.image}`}
                          type="image/webp"
                        />
                        <img
                          src={`${process.env.REACT_APP_URL_IMG}${value.image}`}
                          alt={value.title}
                          className={`rounded-2xl ${
                            videoClip === `${keys}` ? "hidden" : ""
                          }`}
                          loading="lazy"
                        />
                      </picture>
                    ) : (
                      <div className="h-52 bg-slate-200 rounded-xl"></div>
                    )}

                    {/* <iframe width="auto" height="227px" allowFullScreen allow='autoplay' className={`w-full aspect-video rounded-2xl ${videoClip === `${keys}` ? '' : 'hidden'}`} src={`${videoClip === `${keys}` ?  `${value.video}?rel=0&amp;autoplay=1` : ''} `} title={value.title}> </iframe>  */}

                    <button
                      className={`bg-blue-500 rounded-full w-12 h-12 absolute m-auto left-0 right-0 top-0 bottom-0 ${
                        videoClip === `${keys}` ? "hidden" : ""
                      }`}>
                      <picture>
                        <source
                          srcSet="/images/icon/icon-play.png"
                          type="image/webp"
                        />
                        <img
                          src="/images/icon/icon-play.png"
                          alt="icon-play"
                          className="mx-auto w-5 h-5"
                          onClick={onClickVideo}
                          data-target-video={`${value.video}`}
                        />
                      </picture>
                    </button>
                  </div>

                  <div>
                    <h3 className="mb-3 text-slate-700 xl:text-xl lg:text-xl text-lg font-semibold mt-5 line-clamp-2 xl:px-0 lg:px-0 md:px-0 px-0">
                      {value.title}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <SkeletonPortofolio />
            )}
          </div>
        </div>
      );
    };

    return <VideoTestimoni />;
  };

  const CarouselAbout = props => {
    let [counts, setCountS] = useState(0);
    let carousel_item = document.querySelectorAll(".carousel-item-about");

    const defaultItem = (value, key) => {
      <div className="p-0 rounded-xl" key={key}>
        <div
          className={`carousel-item-about rounded-xl ${
            counts === key ? "" : "hidden"
          }`}
          id={`carousel-item-${key}`}>
          <picture>
            <source
              srcSet={`${process.env.REACT_APP_URL_IMG}${value.image}`}
              type="image/webp"
            />
            <img
              src={`${process.env.REACT_APP_URL_IMG}${value.image}`}
              className={`block w-full h-full rounded-xl ${
                counts === key ? "fade-in" : "fade-out"
              }`}
              alt="..."
              loading="lazy"
            />
          </picture>
        </div>
      </div>;
    };

    useEffect(() => {
      if (counts < carousel_item.length) {
        let interval = setInterval(() => {
          setCountS(counts + 1);
        }, 3000);

        return () => {
          clearInterval(interval);
        };
      } else {
        setCountS(0);
        let interval = setInterval(() => {
          setCountS(counts + 1);
        }, 3000);

        return () => {
          clearInterval(interval);
        };
      }
    }, [counts]);

    return (
      <>
        {props.data.map((value, key) => (
          <div
            className={`mx-auto text-center bg-white text-black shadow rounded-xl xl:px-5 lg:px-5 md:px-5 px-10 animations-element border icon-services py-10 cursor-pointer`}
            data-animation="fade-in-fwd"
            key={key}>
            <picture>
              <source
                srcSet={`${process.env.REACT_APP_URL_IMG}${value.image}`}
                type="image/webp"
              />
              <img
                className="w-14 mx-auto"
                src={`${process.env.REACT_APP_URL_IMG}${value.image}`}
                alt="Exhibition & Expo"
                loading="lazy"
              />
            </picture>

            <div className="space-y-3">
              <div className="font-bold xl:text-xl lg:text-lg md:text-lg text-lg mt-5 ">
                <div dangerouslySetInnerHTML={createMarkup(value.name)} />
              </div>
              <div className="mt-5 line-clamp-3">
                <div
                  dangerouslySetInnerHTML={createMarkup(value.description)}
                />
              </div>

              <div className="mx-auto text-center w-full">
                <Link
                  to={`${value.link}`}
                  aria-label={`link to show ${value.link}`}>
                  <p className="w-max  border-blue-500 font-semibold text-blue-500 text-center mx-auto">
                    Learn More{" "}
                  </p>{" "}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const CarouselHeadline = props => {
    let [counts, setCountS] = useState(0);
    let carousel_item = document.querySelectorAll(".carousel-item");

    const HeadlineTitle = ({ value, primary }) => {
      const Tag = primary ? "h1" : "div";
      return (
        <Tag
          className="xl:text-5xl lg:text-3xl text-3xl xl:leading-[53px] lg:leading-[39px] leading-[39px] font-bold text-left text-headline-benner bounce-top pe-10 text-slate-700"
          dangerouslySetInnerHTML={createMarkup(value)}
        />
      );
    };

    useEffect(() => {
      if (counts < carousel_item.length) {
        let interval = setInterval(() => {
          setCountS(counts + 1);
        }, 3000);

        return () => {
          clearInterval(interval);
        };
      } else {
        setCountS(0);
        let interval = setInterval(() => {
          setCountS(counts + 1);
        }, 3000);

        return () => {
          clearInterval(interval);
        };
      }
    }, [counts]);

    return (
      <div>
        <div className="p-0 " id="CarouselHeadline">
          {props.data.map((value, key) => (
            <div
              className={`carousel-item  px-5  ${
                counts === key
                  ? "flex xl:grid lg:grid md:grid  xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 flex-col-reverse gap-9 items-center slide-headline "
                  : "hidden"
              }`}
              key={key}>
              <div className="xl:space-y-5 lg:space-y-5 space-y-2 relative ">
                <HeadlineTitle value={value.title} primary={key === 0} />

                <div
                  className={`mr-10 text-description-benner slide-right xl:pr-14 lg:pr-14 md:pr-4`}
                  data-animation="slide-right">
                  {
                    <div
                      dangerouslySetInnerHTML={createMarkup(value.description)}
                    />
                  }
                </div>
              </div>

              <div className={`slide-right-headline about-image w-full`}>
                <picture>
                  <source
                    srcSet={`${process.env.REACT_APP_URL_IMG}${value.image}`}
                    type="image/webp"
                  />
                  <img
                    src={`${process.env.REACT_APP_URL_IMG}${value.image}`}
                    alt="Layanan event profesional Garuda Organizer"
                    className={`rounded-xl block w-full h-full  ${
                      counts === key ? "fade-in" : "fade-out"
                    } `}
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <SEO
        title="Event Organizer Jakarta Profesional | Garuda Organizer"
        meta_description="Garuda Organizer menyediakan jasa event organizer profesional di Jakarta untuk MICE, recruitment event, corporate hiring, digital services, dan aktivasi brand."
        meta_keywords="event organizer Jakarta, EO Jakarta, jasa event organizer, MICE Indonesia, recruitment event, corporate event, event management"
        canonical="/"
        schema={{
          "@type": "WebSite",
          "@id": "https://www.garudaorganizer.com/#website",
          url: "https://www.garudaorganizer.com",
          name: "Garuda Organizer",
          publisher: {
            "@id": "https://www.garudaorganizer.com/#organization",
          },
          inLanguage: "id-ID",
        }}
      />

      {loading === true ? (
        <Loading />
      ) : (
        <div className={`mx-auto`}>
          <div>
            <div className="container mx-auto py-5 xl:py-20 lg:py-20 md:py-10 px-5 xl:block lg:block ">
              <CarouselHeadline data={banner} />
            </div>
          </div>

          <div className="container mx-auto text-center xl:space-y-5 lg:space-y-5 space-y-5 rounded px-5 xl:py-14 lg:py-14 p-7 bg-sky-50">
            <div className="flex justify-center text-center">
              <div
                className="justify-center text-blue-600 text-sm font-bold leading-6 tracking-wide uppercase whitespace-nowrap items-stretch bg-sky-100 px-4 py-3 rounded-lg self-start max-w-[auto] text-center animations-element"
                data-animation="fade-in-fwd">
                Our Services
              </div>
            </div>

            <h2
              className="text-slate-700 xl:text-5xl lg:text-3xl text-3xl font-bold xl:leading-[53px] lg:leading-[53px] leading-[39px] tracking-normal portofolio-headline animations-element capitalize xl:px-30 lg:px-30 px-8"
              data-animation="slide-top">
              Improve Your Event, Transform Your Experience
            </h2>

            <div>
              <p
                className="xl:px-32 lg:px-32 px-5 xl:mx-10 lg:mx-10 mx-0 font-base py-5 animations-element portofolio-description italic"
                data-animation="slide-top">
                At Garuda Organizer, we are proud to offer a comprehensive range
                of services designed to make your event extraordinary. Whether
                it's a corporate meeting, incentive program, conference or
                exhibition, we bring creativity, precision and innovation to
                every aspect of event planning and execution. Explore our
                services below.
              </p>
            </div>

            <div className="w-full">
              <div className="flex flex-wrap xl:grid lg:grid md:grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2  xl:gap-5 lg:gap-5 gap-8 items-center place-content-center text-center xl:py-14 lg:py-14 py-7 xl:px-5 lg:px-5 md:px-5 px-3">
                {service.map((value, keys) => (
                  <div
                    className={`mx-auto text-center bg-white text-black shadow rounded-xl xl:px-5 lg:px-5 md:px-5 px-10 animations-element border icon-services py-10 cursor-pointer h-[350px]`}
                    data-animation="fade-in-fwd"
                    key={keys}>
                    <picture>
                      <source
                        srcSet={`${process.env.REACT_APP_URL_IMG}${value.image}`}
                        type="image/webp"
                      />
                      <img
                        className="w-14 mx-auto"
                        src={`${process.env.REACT_APP_URL_IMG}${value.image}`}
                        alt="Exhibition & Expo"
                        loading="lazy"
                      />
                    </picture>

                    <div className="space-y-3">
                      <div className="font-bold xl:text-xl lg:text-lg md:text-lg text-lg mt-5 ">
                        <div
                          dangerouslySetInnerHTML={createMarkup(value.name)}
                        />
                      </div>
                      <div className="mt-5 line-clamp-3">
                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            value.description,
                          )}
                        />
                      </div>

                      <div className="mx-auto text-center w-full">
                        <Link
                          to={`${value.link}`}
                          aria-label={`link to show ${value.link}`}>
                          <p className="w-max  border-blue-500 font-semibold text-blue-500 text-center mx-auto">
                            Learn More{" "}
                          </p>{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-mobile-blue xl:py-14 lg:py-14 p-7 mb-0">
            <div className="container mx-auto">
              <div className=" bg-white px-10">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col  ">
                    <div className="flex z-10 flex-col self-stretch my-auto text-black max-md:my-10 max-md:max-w-full space-y-5">
                      <div className="justify-center self-start px-3.5 py-4  text-sm font-bold whitespace-nowrap bg-sky-100 rounded-xl ">
                        WHY CHOOSE US
                      </div>
                      <h2
                        className="text-slate-700 xl:text-5xl lg:text-3xl text-3xl font-bold xl:leading-[53px] lg:leading-[53px] leading-[39px] tracking-normal portofolio-headline animations-element capitalize"
                        data-animation="slide-top">
                        We Bring Solutions To Manage Your Event Way Works Best.
                      </h2>

                      {why_choose_us.map((value, key) => (
                        <div
                          className="flex gap-1 justify-between pr-20 mt-11 mr-2.5 max-md:flex-wrap max-md:pr-5 max-md:max-w-full animations-element"
                          data-animation="fade-in-fwd"
                          key={key}>
                          <div className="hexagon-border flex justify-center place-content-center ">
                            <img
                              src="/images/icon/hextagon-icon.png"
                              alt=""
                              className="absolute"
                            />
                            <picture>
                              <source
                                srcSet={`${process.env.REACT_APP_URL_IMG}${value.image}`}
                                type="image/webp"
                              />
                              <img
                                className="w-14 p-2 mx-auto"
                                src={`${process.env.REACT_APP_URL_IMG}${value.image}`}
                                alt="Exhibition & Expo"
                                loading="lazy"
                              />
                            </picture>
                          </div>
                          <div
                            className="flex flex-col flex-1 my-auto max-md:max-w-full space-y-2"
                            data-animation="fade-in-fwd">
                            <div className="font-bold xl:text-xl lg:text-lg md:text-lg text-lg ">
                              <div
                                dangerouslySetInnerHTML={createMarkup(
                                  value.description,
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col w-[65%] justify-center item-why">
                    <div className="relative flex justify-center">
                      <div className="gallery flex justify-center">
                        {why_choose_us_other_images.map((value, key) => (
                          <img
                            key={key}
                            src={`${process.env.REACT_APP_URL_IMG}${value}`}
                            alt="a house on a mountain"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-sky-50 container mx-auto py-14 z-40 relative">
            <div className="px-5 ">
              <div className="text-center xl:space-y-5 lg:space-y-5 space-y-2 xl:px-5 lg:px-5">
                <div className="xl:space-y-5 lg:space-y-5 space-y-2 xl:px-28 lg:px-28 px-5">
                  <div className="flex justify-center mb-10">
                    <div
                      className="justify-center text-blue-600 text-sm font-bold leading-6 tracking-wide uppercase whitespace-nowrap items-stretch bg-sky-100 px-4 py-3 rounded-lg self-start max-w-[auto] text-center animations-element"
                      data-animation="fade-in-fwd">
                      Our Project
                    </div>
                  </div>

                  <h2
                    className="text-slate-700 xl:text-5xl lg:text-3xl text-3xl font-bold xl:leading-[53px] lg:leading-[39px] leading-[39px]  tracking-normal portofolio-headline  animations-element capitalize xl:px-30 lg:px-30  px-0"
                    data-animation="slide-top">
                    An Epic Journey Through Events Full of Surprises and
                    Inspiration!
                  </h2>

                  <div className="">
                    <p
                      className="xl:px-32 lg:px-10 px-5 xl:mx-10 lg:mx-0 mx-0 mb-5 font-base py-5 animations-element portofolio-description text-md italic"
                      data-animation="slide-top">
                      Our portfolio is a testament to the passion, creativity
                      and dedication we bring to every event. Every project
                      reflects our tireless efforts to provide unforgettable
                      experiences, blending innovation and artistry in every
                      element, affirming our commitment to provide the best for
                      every client.
                    </p>
                  </div>
                </div>

                <div
                  className={`xl:pt-10 lg:pt-10 pt-5 portofolio-wrapper flex xl:block lg:block justify-center animations-element `}
                  data-animation="slide-right-portofolio">
                  <div className="flex flex-wrap xl:grid lg:grid md:flex xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 justify-center align-items-center items-center xl:gap-5 lg:gap-5 gap-8 place-content-center flex-col">
                    {project !== "[]" ? (
                      project.map((value, key) => (
                        <Portfolio
                          key={key}
                          data={true}
                          data_image={`${process.env.REACT_APP_URL_IMG}${value.image}`}
                          data_description={value.description}
                          data_name={value.name}
                        />
                      ))
                    ) : (
                      <SkeletonPortofolio />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-5 xl:py-20 lg:py-20 py-10 ">
            <div className="text-center space-y-5 ">
              <div className="flex justify-center mb-10">
                <div
                  className="justify-center text-blue-600 text-sm font-bold leading-6 tracking-wide uppercase whitespace-nowrap items-stretch bg-sky-100 px-4 py-3 rounded-lg self-start max-w-auto animations-element"
                  data-animation="fade-in-fwd">
                  Our Achievement
                </div>
              </div>

              <h2
                className="text-slate-700 xl:text-5xl lg:text-3xl text-3xl font-bold xl:leading-[53px] lg:leading-[39px] leading-[39px]  tracking-normal portofolio-headline  animations-element capitalize xl:px-30 lg:px-30  px-0"
                data-animation="slide-top">
                Improve Your Event, <br />
                Transform Your Experience
              </h2>
              <div className="flex flex-col xl:grid lg:grid grid-cols-3 items-center place-content-center text-center xl:gap-0 lg:gap-0 gap-4 xl:pt-10 lg:pt-10 py-5">
                {achievement.map((value, key) => (
                  <div
                    className={`${
                      key > 2 ? "xl:border-r-2 lg:border-r" : ""
                    } border-black animations-element`}
                    data-count="true"
                    key={key}>
                    <div className="py-5">
                      <picture>
                        <source
                          srcSet={`${process.env.REACT_APP_URL_IMG}${value.image}`}
                          type="image/webp"
                        />
                        <img
                          className="w-14 mx-auto animations-element icon-count"
                          src={`${process.env.REACT_APP_URL_IMG}${value.image}`}
                          alt={value.name}
                          data-animation="slide-top"
                        />
                      </picture>
                    </div>
                    <div
                      className={"animations-element xl:px-20 lg:px-14 px-14"}
                      data-count="true"
                      data-animation="slide-top-count">
                      <CountUp
                        end={count === true ? value.number : 0}
                        className="number-achievement text-blue-600 "
                      />
                    </div>

                    <div className="uppercase xl:text-xl lg:text-lg text-lg font-bold tracking-tight text-slate-700">
                      <div dangerouslySetInnerHTML={createMarkup(value.name)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-t-3xl">
            <div className="container mx-auto xl:py-20 lg:py-20 py-10 px-5">
              <Testimoni data={testimonial} />
            </div>
          </div>

          <div className="rounded-3xl">
            <div className="py-20 bg-sky-50">
              <div className="container mx-auto text-center px-5">
                <div className="flex justify-center mb-10">
                  <div
                    className="justify-center text-blue-600 text-sm font-bold leading-6 tracking-wide uppercase whitespace-nowrap items-stretch bg-sky-100 px-4 py-3 rounded-lg self-start max-w-auto animations-element"
                    data-animation="fade-in-fwd">
                    Our Client
                  </div>
                </div>

                <div className=" space-y-5">
                  <h2
                    className="text-slate-700 xl:text-5xl lg:text-3 xl text-3xl font-bold xl:leading-[53px] lg:leading-[53px] leading-[39px]  tracking-normal portofolio-headline animations-element capitalize"
                    data-animation="slide-top">
                    We are trusted <br /> by over 1500+ clients.
                  </h2>
                </div>

                <Splide
                  hasTrack={false}
                  options={{
                    rewind: true,
                    autoplay: "playing",
                    type: "loop",
                    perPage: 1,
                    perMove: 1,
                    arrows: "true",
                    pagination: "true",
                    arrowPath: "m15.5 0.932-4.3 4.38...",
                  }}
                  className="animations-element p-0"
                  data-animation="slide-top-client">
                  <SplideTrack>
                    {partner.map((value, key) => (
                      <SplideSlide
                        key={key}
                        className="justify-center flex p-0">
                        <picture>
                          <source
                            srcSet={`${process.env.REACT_APP_URL_IMG}${value.logo}`}
                            type="image/webp"
                          />
                          <img
                            decoding="async"
                            className="w-full"
                            src={`${process.env.REACT_APP_URL_IMG}${value.logo}`}
                            alt="logo BUMN"
                          />
                        </picture>
                      </SplideSlide>
                    ))}
                  </SplideTrack>

                  <div className="splide__arrows">
                    <button className="splide__arrow splide__arrow--prev">
                      &larr;
                    </button>
                    <button className="splide__arrow splide__arrow--next">
                      &rarr;
                    </button>
                  </div>
                </Splide>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
