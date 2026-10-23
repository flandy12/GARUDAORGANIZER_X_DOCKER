import { useEffect, useState } from "react";
import { Loading } from "../../compoments/loading";
import SEO from "../../compoments/seo";
import CallApi from "../../api/Api";
import { createMarkup, scrollToTop } from "../../compoments/htmlTag";
import { useParams } from "react-router-dom";

const serviceSeo = {
  "recruitment-event": {
    title: "Recruitment Event Profesional | Garuda Organizer",
    description:
      "Solusi recruitment event profesional untuk job fair, campus hiring, dan employer branding dengan perencanaan serta pelaksanaan acara yang terintegrasi.",
    keywords:
      "recruitment event, job fair organizer, campus hiring, employer branding, event organizer rekrutmen",
    image: "/images/asset/recruitment-bg.jpg",
  },
  "corporate-hiring": {
    title: "Corporate Hiring Program | Garuda Organizer",
    description:
      "Program corporate hiring terintegrasi untuk membantu perusahaan menjangkau kandidat, membangun employer brand, dan menjalankan proses rekrutmen efektif.",
    keywords:
      "corporate hiring program, hiring event, employer branding, rekrutmen perusahaan, job fair perusahaan",
    image: "/images/asset/corporate-hiring-bg.jpg",
  },
  mice: {
    title: "Jasa MICE & Brand Activation | Garuda Organizer",
    description:
      "Jasa MICE profesional untuk meeting, incentive, convention, exhibition, dan brand activation dengan konsep kreatif serta eksekusi acara menyeluruh.",
    keywords:
      "jasa MICE Jakarta, meeting incentive convention exhibition, brand activation, event organizer MICE",
    image: "/images/asset/mice-bg.jpg",
  },
  "digital-services": {
    title: "Digital Event Services | Garuda Organizer",
    description:
      "Layanan digital event untuk acara online dan hybrid, mulai dari konsep, produksi, aktivasi digital, hingga pengalaman audiens yang interaktif.",
    keywords:
      "digital event services, virtual event, hybrid event, event online, digital activation",
    image: "/images/asset/digital-services-bg.jpg",
  },
};

const fallbackSeo = {
  title: "Layanan Event Organizer | Garuda Organizer",
  description:
    "Temukan layanan event organizer Garuda Organizer untuk kebutuhan MICE, corporate event, recruitment event, dan digital services.",
  keywords: "layanan event organizer, EO Jakarta, event management, MICE Indonesia",
  image: "/images/asset/asset-bg.jpg",
};

const LayoutPageServices = ({}) => {
  const { url } = useParams();
  const seo = serviceSeo[url] || fallbackSeo;
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [banner, setBanner] = useState("");
  const [wording, setWording] = useState("");
  const [banner_description, setBannerDescription] = useState("");
  const [other_images, setOtherImages] = useState([]);
  const [image, setImage] = useState([]);
  const [hover_element, setHoverElement] = useState("");
  const link = "https://cms.garudaorganizer.com/";

  useEffect(() => {
    CallApi(`service?url=${url}`, "GET").then(ressponse => {
      scrollToTop();

      if (ressponse.success === true) {
        setLoading(false);
        setBanner(ressponse.results ? ressponse.results.banner : "");
        setWording(ressponse.results.wording ? ressponse.results.wording : "");
        setBannerDescription(
          ressponse.results ? ressponse.results.description : "",
        );
        setOtherImages(ressponse.results ? ressponse.results.other_images : "");
        setImage(ressponse.results ? ressponse.results.image : "");
        setTitle(ressponse.results ? ressponse.results.title : "");
      }
    });
  }, [url]);

  const MouseHover = e => {
    e.preventDefault();
    setHoverElement(e.target.getAttribute("data-target"));
  };

  return (
    <>
      <SEO
        title={seo.title}
        meta_description={seo.description}
        meta_keywords={seo.keywords}
        canonical={`/service/${url}`}
        og_image={banner || seo.image}
        schema={{
          "@type": "Service",
          name: title || seo.title.replace(" | Garuda Organizer", ""),
          description: seo.description,
          url: `https://www.garudaorganizer.com/service/${url}`,
          areaServed: { "@type": "Country", name: "Indonesia" },
          provider: {
            "@id": "https://www.garudaorganizer.com/#organization",
          },
        }}
      />
      {loading === false ? (
        <>
          <div className="flex overflow-hidden relative flex-col justify-center items-center self-stretch px-16 py-12 w-full min-h-[500px] max-md:px-5 max-md:max-w-full">
            <picture>
              <source srcSet={`${banner}`} type="image/webp" />
              <img
                className="object-cover absolute inset-0 size-full"
                src={`${banner}`}
                alt={title}
                loading="lazy"
              />
            </picture>
            <div className="flex relative flex-col mt-40 mb-28 max-w-full  max-md:my-10">
              <h1 className="self-center text-6xl font-bold text-white max-md:max-w-full max-md:text-4xl">
                {title}
              </h1>
              <div
                className="mt-10 text-base text-center w-[726px] text-white text-opacity-80 max-md:mt-10 max-md:max-w-full"
                dangerouslySetInnerHTML={createMarkup(
                  wording === "null" ? "" : wording,
                )}
              />
            </div>
          </div>

          <div className="container mx-auto">
            <div className="flex flex-col items-center pb-12 bg-white px-8">
              <div className="xl:mt-12 lg:mt-12 md:mt-5 sm:mt-5 w-full max-md:mt-10 max-md:max-w-full">
                <div className="flex space-y-5 gap-5 max-md:flex-col-reverse">
                  <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow place-content-center max-md:max-w-full">
                      <span className=" justify-center self-start px-5 py-2 font-bold text-white whitespace-nowrap rounded-3xl border border-blue-300 border-solid capitalize bg-cs">
                        {title}
                      </span>
                      <div
                        className="mt-8 text-base text-black max-md:max-w-full"
                        dangerouslySetInnerHTML={createMarkup(
                          banner_description,
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[54%] max-md:ml-0 max-md:w-full">
                    <picture>
                      <source srcSet={`${image}`} type="image/webp" />
                      <img
                        className="w-full aspect-[1.61] max-md:max-w-full rounded-xl"
                        src={`${image}`}
                        alt={title}
                        loading="lazy"
                      />
                    </picture>
                  </div>
                </div>
              </div>
              <div className="w-full max-md:mt-10 max-md:max-w-full">
                <div className="my-8 text-2xl font-semibold  text-blue-500 uppercase max-md:mt-10 max-md:max-w-full">
                  {other_images.length > 0 ? <h2>Project</h2> : ""}
                </div>
                <div className="flex justify-between gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex max-md:flex-col justify-between gap-5 w-full">
                    {other_images.length > 0
                      ? other_images.map((value, keys) => (
                          <div
                            className={`relative rounded-lg overflow-hidden cursor-pointer ${
                              hover_element === "element-" + keys
                                ? "bg-black "
                                : ""
                            } `}
                            onMouseEnter={MouseHover}
                            onTouchStart={MouseHover}
                            key={keys}>
                            <picture>
                              <source
                                srcSet={`${link}${value.image}`}
                                type="image/webp"
                              />
                              <img
                                className={`h-full object-cover ${
                                  hover_element === "element-" + keys
                                    ? "opacity-55"
                                    : ""
                                } `}
                                src={`${link}${value.image}`}
                                alt="Digital Services"
                                loading="lazy"
                                data-target={`element-${keys}`}
                              />
                            </picture>
                            <div
                              className={`absolute bottom-5 left-4 right-5 text-white ${
                                hover_element === "element-" + keys
                                  ? " "
                                  : "hidden"
                              }`}>
                              <div
                                className="font-semibold text-base"
                                dangerouslySetInnerHTML={createMarkup(
                                  value.title.replace("-", "<br>"),
                                )}
                              />
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default LayoutPageServices;
