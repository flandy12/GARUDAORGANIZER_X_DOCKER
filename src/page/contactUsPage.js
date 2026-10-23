import { useEffect, useState } from "react";
import CallApi from "../api/Api";
import { Loading } from "../compoments/loading";
import { scrollToTop } from "../compoments/htmlTag";
import SEO from "../compoments/seo";

const ContactUs = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [contact, setContact] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let isMounted = true;
    scrollToTop();

    CallApi("contact-us-information", "GET", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_URL_API_KEY}`,
      },
    })
      .then(response => {
        if (!isMounted) return;
        if (response.success === true) setContact(response.results || {});
        else window.alert("Error Page");
      })
      .catch(() => window.alert("Error Page"))
      .finally(() => isMounted && setLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    setErrors({});
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    CallApi("contact-us/send", "POST", {
      headers: { Accept: "application/json" },
      body: formData,
    })
      .then(response => {
        if (response.success === true) {
          window.alert(response.title);
          event.target.reset();
        } else {
          const safeErrors = {};
          Object.entries(response.errors || {}).forEach(([field, messages]) => {
            safeErrors[field] = Array.isArray(messages) ? messages[0] : String(messages);
          });
          setErrors(safeErrors);
        }
      })
      .catch(() => window.alert("Error Page"))
      .finally(() => setSubmitting(false));
  };

  const ErrorText = ({ name }) => errors[name] ? <p className="contact-form__error">{errors[name]}</p> : null;

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
        <main className="contact-page">
          <section className="landing-shell contact-layout">
            <div className="contact-intro">
              <span className="landing-eyebrow">Contact</span>
              <h1>Contact Our Team</h1>
              <p>Don't hesitate to contact our team and share your ideas, questions, or needs. We're here to help make any challenges you face a reality. Together, let's find the right solution to meet your needs!</p>
              <strong>Contact us via:</strong>
              <a href={`mailto:${contact.to_email || ""}`} className="contact-email">
                <span aria-hidden="true">✉</span>{contact.to_email}
              </a>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form__grid">
                <label>
                  <span>Full Name</span>
                  <input type="text" name="full_name" autoComplete="name" required />
                  <ErrorText name="full_name" />
                </label>
                <label>
                  <span>Email Address</span>
                  <input type="email" name="email" autoComplete="email" required />
                  <ErrorText name="email" />
                </label>
                <label>
                  <span>Phone</span>
                  <input type="tel" name="phone_number" autoComplete="tel" inputMode="tel" required />
                  <ErrorText name="phone_number" />
                </label>
                <label>
                  <span>Company</span>
                  <input type="text" name="company_name" autoComplete="organization" />
                  <ErrorText name="company_name" />
                </label>
              </div>
              <label className="contact-form__message">
                <span>Leave us a message</span>
                <textarea name="body_message" rows="6" required />
                <ErrorText name="body_message" />
              </label>
              <button className="contact-form__submit" type="submit" disabled={submitting}>
                {submitting ? <><span className="contact-form__spinner" aria-hidden="true" />Loading...</> : <>Send Message <span aria-hidden="true">↗</span></>}
              </button>
            </form>
          </section>
        </main>
      )}
    </>
  );
};

export default ContactUs;
