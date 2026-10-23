import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallApi from "../api/Api";
import { Loading } from "../compoments/loading";
import { createMarkup, scrollToTop } from "../compoments/htmlTag";
import PageHero, { resolveImage } from "../compoments/pageHero";
import SEO from "../compoments/seo";

const AboutPage = () => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    message: "",
    banner: "",
    wording: "",
    visionMission: "",
    image: "",
  });

  useEffect(() => {
    let isMounted = true;
    scrollToTop();

    CallApi("about-us", "GET")
      .then(response => {
        if (!isMounted) return;
        if (response.success === true) {
          const results = response.results || {};
          setContent({
            message: results.banner_wording || "",
            banner: results.banner || "",
            wording: results.wording || "",
            visionMission: results.vision_mission || "",
            image: results.image || "",
          });
        } else {
          window.alert("Error Page");
        }
      })
      .catch(() => window.alert("Error Page"))
      .finally(() => isMounted && setLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <SEO
        title="Garuda Organizer"
        meta_description=""
        meta_keywords=""
        author="Garuda Organizer"
        url={window.location.href}
        og_image="/favicon.ico"
      />
      {loading ? (
        <Loading />
      ) : (
        <main className="inner-page">
          <PageHero title="About Us" description={content.message} image={content.banner} />

          <section className="inner-section">
            <div className="landing-shell inner-split">
              <div className="inner-copy reveal is-visible">
                <span className="landing-eyebrow">company history</span>
                <div className="inner-richtext" dangerouslySetInnerHTML={createMarkup(content.wording)} />
              </div>
              <div className="inner-media reveal is-visible">
                <img src={resolveImage(content.image)} alt="About Asset" loading="lazy" />
              </div>
            </div>
          </section>

          <section className="inner-section inner-section--soft">
            <div className="landing-shell inner-mission">
              <span className="landing-eyebrow">our mission &amp; vission</span>
              <div className="inner-richtext" dangerouslySetInnerHTML={createMarkup(content.visionMission)} />
            </div>
          </section>

          <section className="inner-section">
            <div className="landing-shell inner-cta">
              <div className="inner-cta__content">
                <h2>Have a question ?<br />Our team is happy <br />to assist you</h2>
                <p>Don't hesitate to contact our team and share your ideas, questions, or needs. We're here to help make any challenges you face a reality. Together, let's find the right solution to meet your needs!</p>
                <Link className="landing-button landing-button--primary" to="/contact">
                  Contact Us <span aria-hidden="true">➤</span>
                </Link>
              </div>
              <img src="/images/asset/contact-us-about.png" alt="" loading="lazy" />
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default AboutPage;
