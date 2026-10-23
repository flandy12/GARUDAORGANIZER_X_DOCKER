import { createMarkup } from "./htmlTag";

const resolveImage = image => {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;
  return `${process.env.REACT_APP_URL_IMG}${image}`;
};

const PageHero = ({ title, description, image }) => (
  <section className="inner-hero">
    {image && <img className="inner-hero__image" src={resolveImage(image)} alt="" />}
    <div className="inner-hero__overlay" aria-hidden="true" />
    <div className="landing-shell inner-hero__content">
      <span className="landing-eyebrow landing-eyebrow--dark">Garuda Organizer</span>
      <h1>{title}</h1>
      {description && (
        <div className="inner-hero__description" dangerouslySetInnerHTML={createMarkup(description === "null" ? "" : description)} />
      )}
    </div>
  </section>
);

export { resolveImage };
export default PageHero;
