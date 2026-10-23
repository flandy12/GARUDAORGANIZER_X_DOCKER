import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../../compoments/loading";
import PageHero, { resolveImage } from "../../compoments/pageHero";
import SEO from "../../compoments/seo";
import CallApi from "../../api/Api";
import { createMarkup, scrollToTop } from "../../compoments/htmlTag";

const LayoutPageServices = () => {
  const { url } = useParams();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    title: "",
    banner: "",
    wording: "",
    description: "",
    images: [],
    image: "",
  });

  useEffect(() => {
    let isMounted = true;
    scrollToTop();
    setLoading(true);

    CallApi(`service?url=${encodeURIComponent(url)}`, "GET")
      .then(response => {
        if (!isMounted) return;
        if (response.success === true) {
          const results = response.results || {};
          setContent({
            title: results.title || "",
            banner: results.banner || "",
            wording: results.wording || "",
            description: results.description || "",
            images: Array.isArray(results.other_images) ? results.other_images : [],
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
  }, [url]);

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
        <main className="inner-page service-detail">
          <PageHero title={content.title} description={content.wording} image={content.banner} />

          <section className="inner-section">
            <div className="landing-shell inner-split service-detail__intro">
              <div className="inner-copy">
                <span className="landing-eyebrow">{content.title}</span>
                <div className="inner-richtext" dangerouslySetInnerHTML={createMarkup(content.description)} />
              </div>
              <div className="inner-media">
                <img src={resolveImage(content.image)} alt={content.title} loading="lazy" />
              </div>
            </div>
          </section>

          {content.images.length > 0 && (
            <section className="inner-section inner-section--soft service-projects">
              <div className="landing-shell">
                <div className="landing-heading landing-heading--left">
                  <span className="landing-eyebrow">Project</span>
                </div>
                <div className="service-projects__grid">
                  {content.images.map((item, index) => (
                    <article className="service-project-card" key={item.id || index} tabIndex="0">
                      <img src={resolveImage(item.image)} alt={item.title || content.title} loading="lazy" />
                      <div className="service-project-card__overlay">
                        <div dangerouslySetInnerHTML={createMarkup((item.title || "").replace("-", "<br>"))} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      )}
    </>
  );
};

export default LayoutPageServices;
