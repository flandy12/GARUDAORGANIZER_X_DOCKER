import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="status-page">
    <section className="status-card status-card--error">
      <span className="status-card__code">404</span>
      <h1>404</h1>
      <p>Oops! The page you are looking for could not be found.</p>
      <Link to="/" className="status-card__button">Go back to Home</Link>
    </section>
  </main>
);

export default NotFound;
