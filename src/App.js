import "./App.css";
import "./index.css";
import "./css/style.css";
import "./css/animation.min.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./page/home";
import PortofolioPage from "./page/portofolioPage";
import ServicesPage from "./page/servicePage";
import ContactUs from "./page/contactUsPage";
import { HelmetProvider } from "react-helmet-async";
import MicePage from "./page/mice";
import RecruitmentPage from "./page/recruitmentPage";
import DigitalPage from "./page/digitalPage";
import CorporateHiringPage from "./page/corporateHiringPage";
import AboutPage from "./page/aboutPage";
import Layout from "./page/layout";
import SEO from "./compoments/seo";
import NotFound from "./page/error/error_404";
import MaintenancePage from "./page/error/maintenance";
import { useEffect, useState } from "react";
import LayoutPageServices from "./page/layout/services";
import HabitatPage from "./page/habitat";
import ThankyouPage from "./page/thankyouPage";
import OfflinePage from "./page/offlineRegisterPage";

function App() {
  // const [ip, setIP] = useState("");

  // const getData = async () => {
  //   try {
  //     const response = await fetch("https://geolocation-db.com/json/");
  //     const data = await response.json();
  //     setIP(data.IPv4);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const RouteGrup = () => {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/portofolio" element={<PortofolioPage />} />
        <Route path="/service/:url" element={<LayoutPageServices />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* <Route path="/pendaftaran" element={<HabitatPage />} />
        <Route path="/offline" element={<OfflinePage/>} /> */}
        <Route path="/success" element={<ThankyouPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )};

  return (
    <HelmetProvider>
      <Layout>
        <SEO
          title={
            "Garuda Organizer - Perusahaan Profesional Di Bidang Jasa Event Organizer (EO) Jakarta"
          }
          meta_description={
            "Garuda Organizer - Jelajahi Kreativitas dan Kelengkapan Dokumentasi Acara bersama Garuda Organizer, Jasa Event Organizer Profesional di Jakarta dengan Konsep Unik!"
          }
          meta_keywords={
            "eo jakarta, eo indonesia, event organizer, event online, event management, bazzar, mice, event, event tebaik, jakarta"
          }
          author={"Garuda Organizer"}
          url={window.location.href}
        />
        <RouteGrup />
      </Layout>
    </HelmetProvider>
  );
}

export default App;
