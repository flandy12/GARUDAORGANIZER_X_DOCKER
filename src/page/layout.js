import { useEffect, useState } from "react";
import CallApi from "../api/Api";
import {Navbar} from "../compoments/navbar";
import Whatsapp from "../compoments/whatsapp";
import Footer from "../compoments/footer";

const Layout = ({children}) => {
    
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    CallApi('contact-us-information', 'GET', {
      headers: {
        'Accept': 'application/json',
        'Authorization' : `Bearer ${process.env.REACT_APP_URL_API_KEY}`
      },
    }).then(ress => {
        if (isMounted && ress.success === true) {
          setData(ress.results || {});
        }
    }).catch(() => {
      if (isMounted) setData({});
    });

    return () => {
      isMounted = false;
    };
  }, [])
    return (
        <>
          <Navbar/>
          <Whatsapp data={data.whatsapp_number}/>
            {children}
          <Footer data={data.to_email}/>
        </>
    )
}

export default Layout;
