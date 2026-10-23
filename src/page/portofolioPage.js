import { useEffect, useState } from "react";
import CallApi from "../api/Api";
import { Loading } from "../compoments/loading";
import SEO from "../compoments/seo";
import { createMarkup, scrollToTop } from "../compoments/htmlTag";
import { resolveImage } from "../compoments/pageHero";

const fallbackImages = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&auto=format&fit=crop&q=80",
];

const defaultTitle = "An Epic Journey Through Events Full of Surprises and Inspiration!";
const defaultWording = "Our portfolio is a testament to the passion, creativity and dedication we bring to every event. Every project reflects our tireless efforts to provide unforgettable experiences, blending innovation and artistry in every element, affirming our commitment to provide the best for every client.";

const PortofolioPage = () => {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState([]);
  const [title, setTitle] = useState("");
  const [wording, setWording] = useState("");

  useEffect(() => {
    let isMounted = true;
    scrollToTop();

    CallApi("project", "GET")
      .then(response => {
        if (!isMounted) return;
        if (response.success === true) {
          setTitle(response.title || "");
          setWording(response.wording || "");
          setProject(response.results?.results || []);
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

  const fallbackProjects = fallbackImages.map((image, index) => ({
    image,
    title: "Recruitment Event",
    description: "Organized socialization of the contents of my plate and parenting",
    id: `fallback-${index}`,
  }));
  const projects = project.length ? project : fallbackProjects;

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
        <main className="portfolio-page">
          <section className="portfolio-intro">
            <div className="landing-shell landing-heading">
              <span className="landing-eyebrow">Our Project</span>
              <h1>{title || defaultTitle}</h1>
              <p>{wording || defaultWording}</p>
            </div>
          </section>

          <section className="landing-shell portfolio-grid">
            {projects.map((item, index) => (
              <article className="portfolio-card" key={item.id || index} tabIndex="0">
                <img src={resolveImage(item.image)} alt={item.title || ""} loading="lazy" />
                <div className="portfolio-card__overlay">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 dangerouslySetInnerHTML={createMarkup(item.title)} />
                    <div dangerouslySetInnerHTML={createMarkup(item.description)} />
                  </div>
                </div>
              </article>
            ))}
          </section>
        </main>
      )}
    </>
  );
};

export default PortofolioPage;
