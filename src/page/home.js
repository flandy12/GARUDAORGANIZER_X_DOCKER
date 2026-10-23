import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import CountUp from "react-countup";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import CallApi from "../api/Api";
import Portfolio from "../compoments/portofolio";
import SEO from "../compoments/seo";
import SkeletonPortofolio from "../compoments/skeleton";
import { Loading } from "../compoments/loading";
import { createMarkup, scrollToTop } from "../compoments/htmlTag";

const imageUrl = path => `${process.env.REACT_APP_URL_IMG}${path || ""}`;

const SectionHeading = ({ eyebrow, title, description, align = "center" }) => (
  <div className={`landing-heading landing-heading--${align} reveal`}>
    <span className="landing-eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>
);

const HomePage = () => {
  const [content, setContent] = useState({
    banner: [],
    achievement: [],
    partner: [],
    project: [],
    service: [],
    testimonial: [],
    whyChooseUs: [],
    whyChooseUsImages: [],
  });
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(false);
  const achievementRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    CallApi("home", "GET")
      .then(response => {
        if (!isMounted) return;

        if (response.success === true) {
          const results = response.results || {};
          setContent({
            banner: results.banner || [],
            achievement: results.achievement || [],
            partner: results.partner || [],
            project: results.project || [],
            service: results.service || [],
            testimonial: results.testimonial || [],
            whyChooseUs: results.why_choose_us || [],
            whyChooseUsImages: results.why_choose_us_other_images || [],
          });

          if (!sessionStorage.getItem("garuda-recruitment-warning")) {
            sessionStorage.setItem("garuda-recruitment-warning", "shown");
            Swal.fire({
              title: "MOHON HATI-HATI!",
              html: "<p class='text-center'>Garuda Organizer tidak pernah menyelenggarakan acara rekrutmen dengan iming-iming hadiah/bonus/komisi/bentuk apapun serta tidak pernah menggunakan nama/brand lain selain daripada <b> Garuda Organizer (PT Garuda Nusantara Kencana)</b> atau <b>Mega Career Expo</b>. Apabila ada yang menggunakan brand diatas dengan tambahan embel-embel pada brand tersebut, <br/><b>itu bukan bagian dari kami</b>. Harap berhati-hati.</p>",
              icon: "warning",
              iconColor: "#0e1663",
              confirmButtonColor: "#2563eb",
              showCloseButton: true,
              background: "#fff",
              backdrop: "rgba(5, 12, 35, 0.72)",
            });
          }
        } else {
          window.alert("Error Page");
        }
      })
      .catch(() => window.alert("Error Page"))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    scrollToTop();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    if (!achievementRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(achievementRef.current);
    return () => observer.disconnect();
  }, [loading]);

  const CarouselHeadline = ({ data }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
      if (data.length <= 1) return undefined;
      const interval = window.setInterval(
        () => setActiveSlide(current => (current + 1) % data.length),
        5500,
      );
      return () => window.clearInterval(interval);
    }, [data.length]);

    if (!data.length) return null;
    const active = data[activeSlide];

    return (
      <section className="landing-hero" aria-label="Garuda Organizer">
        <div className="landing-shell landing-hero__grid">
          <div className="landing-hero__content">
            <span className="landing-eyebrow landing-eyebrow--dark">Garuda Organizer</span>
            <div className="landing-hero__title" dangerouslySetInnerHTML={createMarkup(active.title)} />
            <div className="landing-hero__description" dangerouslySetInnerHTML={createMarkup(active.description)} />
            <div className="landing-hero__actions">
              <Link className="landing-button landing-button--primary" to="/contact">
                Contact <span aria-hidden="true">↗</span>
              </Link>
              <Link className="landing-button landing-button--ghost" to="/portofolio">
                Our Project <span aria-hidden="true">→</span>
              </Link>
            </div>
            {data.length > 1 && (
              <div className="landing-hero__pagination" aria-label="Banner navigation">
                {data.map((item, index) => (
                  <button
                    type="button"
                    key={item.id || index}
                    className={index === activeSlide ? "is-active" : ""}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Banner ${index + 1}`}
                    aria-current={index === activeSlide ? "true" : undefined}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="landing-hero__visual" key={active.image}>
            <div className="landing-hero__frame">
              <img src={imageUrl(active.image)} alt="benners-headline" />
            </div>
            <div className="landing-hero__shape" aria-hidden="true" />
          </div>
        </div>
      </section>
    );
  };

  const openVideo = url => {
    try {
      const parsedUrl = new URL(url);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) return;
      window.open(parsedUrl.href, "_blank", "noopener,noreferrer");
    } catch {
      // Abaikan URL video yang tidak valid dari API.
    }
  };

  return (
    <>
      <SEO
        title="Garuda Organizer - Perusahaan Profesional Di Bidang Jasa Event Organizer (EO) Jakarta"
        meta_description="Garuda Organizer adalah perusahaan profesional di bidang Jasa Event Organizer (EO) dan Penyelenggara Acara di Jakarta dengan konsep unik dan dokumentasi lengkap"
        meta_keywords="eo jakarta, eo indonesia, event organizer, event online, event management"
        author="Garuda Organizer"
        url={window.location.href}
      />

      {loading ? (
        <Loading />
      ) : (
        <main className="landing-page">
          <CarouselHeadline data={content.banner} />

          <section className="landing-section landing-section--services">
            <div className="landing-shell">
              <SectionHeading
                eyebrow="Our Services"
                title="Improve Your Event, Transform Your Experience"
                description="At Garuda Organizer, we are proud to offer a comprehensive range of services designed to make your event extraordinary. Whether it's a corporate meeting, incentive program, conference or exhibition, we bring creativity, precision and innovation to every aspect of event planning and execution. Explore our services below."
              />
              <div className="landing-service-grid">
                {content.service.map((item, index) => (
                  <article className="landing-service-card reveal" key={item.id || index}>
                    <div className="landing-service-card__number">{String(index + 1).padStart(2, "0")}</div>
                    <div className="landing-service-card__icon">
                      <img src={imageUrl(item.image)} alt="" loading="lazy" />
                    </div>
                    <div className="landing-service-card__body">
                      <h3 dangerouslySetInnerHTML={createMarkup(item.name)} />
                      <div className="landing-service-card__description" dangerouslySetInnerHTML={createMarkup(item.description)} />
                    </div>
                    <Link className="landing-card-link" to={item.link || "/"}>
                      Learn More <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="landing-section landing-section--why">
            <div className="landing-shell landing-why">
              <div className="landing-why__content">
                <SectionHeading
                  eyebrow="WHY CHOOSE US"
                  title="We Bring Solutions To Manage Your Event Way Works Best."
                  align="left"
                />
                <div className="landing-reasons">
                  {content.whyChooseUs.map((item, index) => (
                    <article className="landing-reason reveal" key={item.id || index}>
                      <div className="landing-reason__icon">
                        <img src={imageUrl(item.image)} alt="" loading="lazy" />
                      </div>
                      <div dangerouslySetInnerHTML={createMarkup(item.description)} />
                    </article>
                  ))}
                </div>
              </div>
              <div className="landing-collage reveal" aria-hidden="true">
                {content.whyChooseUsImages.slice(0, 4).map((item, index) => (
                  <img src={imageUrl(item)} alt="" key={index} loading="lazy" />
                ))}
              </div>
            </div>
          </section>

          <section className="landing-section landing-section--projects">
            <div className="landing-shell">
              <SectionHeading
                eyebrow="Our Project"
                title="An Epic Journey Through Events Full of Surprises and Inspiration!"
                description="Our portfolio is a testament to the passion, creativity and dedication we bring to every event. Every project reflects our tireless efforts to provide unforgettable experiences, blending innovation and artistry in every element, affirming our commitment to provide the best for every client."
              />
              <div className="landing-project-grid reveal">
                {content.project.length ? content.project.map((item, index) => (
                  <Portfolio
                    key={item.id || index}
                    data_image={imageUrl(item.image)}
                    data_description={item.description}
                    data_name={item.name}
                  />
                )) : <SkeletonPortofolio />}
              </div>
            </div>
          </section>

          <section className="landing-section landing-section--achievement" ref={achievementRef}>
            <div className="landing-shell">
              <SectionHeading
                eyebrow="Our Achievement"
                title={<>Improve Your Event, <br />Transform Your Experience</>}
              />
              <div className="landing-achievement-grid">
                {content.achievement.map((item, index) => (
                  <article className="landing-achievement reveal" key={item.id || index}>
                    <img src={imageUrl(item.image)} alt="" loading="lazy" />
                    <strong><CountUp end={count ? Number(item.number) : 0} duration={2.4} /></strong>
                    <div dangerouslySetInnerHTML={createMarkup(item.name)} />
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="landing-section landing-section--testimonials">
            <div className="landing-shell">
              <SectionHeading
                eyebrow="From Our Happy Customers"
                title="Don't take our word for it. See what customers are saying about us."
                description="We have held various events with various themes, both for private and government agencies. Our success creates unforgettable experiences."
              />
              <div className="landing-testimonial-grid">
                {content.testimonial.length ? content.testimonial.map((item, index) => (
                  <article className="landing-testimonial reveal" key={item.id || index}>
                    <button
                      type="button"
                      className="landing-testimonial__media"
                      onClick={() => openVideo(item.video)}
                      aria-label={item.title}>
                      {item.image ? <img src={imageUrl(item.image)} alt="" loading="lazy" /> : <span className="landing-testimonial__placeholder" />}
                      <span className="landing-testimonial__play" aria-hidden="true">▶</span>
                    </button>
                    <h3>{item.title}</h3>
                  </article>
                )) : <SkeletonPortofolio />}
              </div>
            </div>
          </section>

          <section className="landing-section landing-section--clients">
            <div className="landing-shell">
              <SectionHeading eyebrow="Our Client" title={<>We are trusted <br /> by over 1500+ clients.</>} />
              <Splide
                options={{ rewind: true, autoplay: true, interval: 3500, pauseOnHover: true, perPage: 1, arrows: true, pagination: true }}
                className="landing-client-slider reveal"
                aria-label="Our Client">
                {content.partner.map((item, index) => (
                  <SplideSlide key={item.id || index}>
                    <img src={imageUrl(item.logo)} alt="logo BUMN" loading="lazy" />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default HomePage;
