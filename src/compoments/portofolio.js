import { createMarkup } from "./htmlTag";

const Portfolio = ({ data_image, data_description, data_name }) => (
  <article className="project-card">
    <div className="project-card__media">
      <img src={data_image} alt={data_name || ""} loading="lazy" />
    </div>
    <div className="project-card__body">
      <h3>{data_name}</h3>
      <div dangerouslySetInnerHTML={createMarkup(data_description)} />
    </div>
  </article>
);

export default Portfolio;
