import { useEffect, useState } from "react";
import CallApi from "../api/Api";
import {Navbar} from "../compoments/navbar";
import Whatsapp from "../compoments/whatsapp";
import Footer from "../compoments/footer";

const Layout = ({children}) => {
    
  const [data, setData] = useState([]);

  useEffect(() => {
    CallApi('contact-us-information', 'GET', {
      headers: {
        'Accept': 'application/json',
        'Authorization' : `Bearer ${process.env.REACT_APP_URL_API_KEY}`
      },
    }).then(ress => {
        
        setData(ress.results);
 
    })
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