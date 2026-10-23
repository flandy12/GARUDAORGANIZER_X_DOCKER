import { useEffect, useState } from "react";
import Portfolio from "../compoments/portofolio";
import CallApi from "../api/Api";
import SkeletonPortofolio from "../compoments/skeleton";
import { Link } from "react-router-dom";
import { Loading } from "../compoments/loading";
import SEO from "../compoments/seo";
import {createMarkup, scrollToTop } from "../compoments/htmlTag";


const PortofolioPage = () => {
    const [project, setProject] = useState([]);
    const [loading, setLoading ] = useState(true);
    const [elementPortofolio, setElementPortofolio] = useState('');
    const [title, setTitle] = useState('');
    const [wording, setWording] = useState('');

    const DataImage = ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fFJlY3J1aXRtZW50JTIwRXZlbnR8ZW58MHx8MHx8fDA%3D','https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q29ycG9yYXRlJTIwSGlyaW5nJTIwUHJvZ3JhbXxl bnwwfHwwfHx8MA%3D%3D','https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TXVzaWMlMjBjb25jZXJ0fGVufDB8fDB8fHww','https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEdhdGhlcmluZ3MlMjBldmVudHxlbnwwfHwwfHx8MA%3D%3D','https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGh5YnJpZCUyMGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D']

    
    useEffect(() => {
      CallApi('project', 'GET')
      .then( ressponse => {
        scrollToTop();
        if(ressponse.success === true) {
            // setProject(ressponse.results.project);
            setLoading(false);
            setTitle(ressponse.title);
            setWording(ressponse.wording);
            setProject(ressponse.results.results);  
         
        } else {
            alert('Error Page');
         
        }
       
      })

    }, []);

    const ElementHover = (e) => {
        setElementPortofolio(e.target.getAttribute('data-target'));
    }

    const ElementHoverOut = () => {
        setElementPortofolio();
    }

 
    return (
        <>
   
        <SEO 
            title={'Garuda Organizer'}
            meta_description={''}
            meta_keywords={''}
            author={'Garuda Organizer'}
            url={window.location.href}
            og_image={`/public/favicon.ico`}
            />
       
        {loading !== true ? (
            <div className="container mx-auto px-5">
                <div className="py-20">
                <div className="text-center space-y-5" onMouseOver={ElementHover} onTouchStart={ElementHover} data-target="">
            
                <div className='flex justify-center flex-col items-center mb-5 space-y-5'>
                    <div className="mx-auto text-center text-blue-600 text-sm font-bold leading-6 tracking-wide uppercase whitespace-nowrap items-stretch bg-sky-100 px-4 py-3 rounded-lg self-start max-w-[160px]">
                    Our Project
                    </div>
                    <h2 className="text-slate-700 xl:text-5xl lg:text-3xl text-3xl text-center font-bold xl:leading-[53px] lg:leading-[39px] leading-[39px] tracking-normal capitalize max-w-[900px]" data-animation="slide-top">
                    {title === '' ? ' An Epic Journey Through Events Full of Surprises and Inspiration!' : title} 
                    </h2>
                </div>
                
                <div className="">
                    <p className="xl:px-32 lg:px-32 px-5 xl:mx-10 lg:mx-11 mx-0 mb-5 font-base pb-10">
                    {wording !== "" ? 'Our portfolio is a testament to the passion, creativity and dedication we bring to every event. Every project reflects our tireless efforts to provide unforgettable experiences, blending innovation and artistry in every element, affirming our commitment to provide the best for every client.' : wording}
                    </p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center xl:grid lg:grid md:grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2  xl:gap-5 lg:gap-5 gap-8 items-center place-content-center" >
                    {project === null ? (
                        DataImage.map((value,key) => (
                            
                            <div className="relative bg-black rounded-xl" key={key}>
                               <picture>   
                                    <source srcSet={`${value}`} type="image/webp" />
                                    <img className={`h-auto max-w-full rounded-lg cursor-pointer ${elementPortofolio === `element-text-${key+1}` ? 'opacity-50' : ''}  `} src={`${value}`} alt="" data-target={`element-text-${key+1}`} onMouseOver={ElementHover} onTouchStart={ElementHover}/>
                                </picture>
                          
                            <div className={`my-4 space-y-4 text-white absolute bottom-10 left-5 right-5 z-0 ${elementPortofolio === `element-text-${key+1}` ? '' : 'hidden'}`} id={`element-text-${key+1}`}>
                                <h1 className="font-semibold text-lg">Recruitment Event</h1>
                                <p className="text-white">Organized socialization of the contents of my plate and parenting</p>
                            </div>
                        </div> 
                        ))
                    ) : project.map((value,key) => (
                    
                    <div className="relative bg-black rounded-xl" key={key}>
                        <picture>   
                            <source srcSet={`${process.env.REACT_APP_URL_IMG}${value.image}`} type="image/webp" />
                            <img className={`h-auto max-w-full rounded-lg cursor-pointer ${elementPortofolio === `element-text-${key+1}` ? 'opacity-50' : ''}  `} src={`${process.env.REACT_APP_URL_IMG}${value.image}`} alt={value.title} data-target={`element-text-${key+1}`} onMouseOver={ElementHover} onTouchStart={ElementHover} />
                        </picture>

                        <div className={` space-y-4 text-white absolute bottom-10 max-md:my-0 max-md:bottom-2 left-5 right-5 z-0  h-auto ${elementPortofolio === `element-text-${key+1}` ? '' : 'hidden'}`} id={`element-text-${key+1}`}>
                            <div className="font-semibold text-lg">
                                <div className="max-md:text-base" dangerouslySetInnerHTML={createMarkup(value.title)} />  
                            </div>
                           
                            <div className="text-white">
                                 <div className="max-md:text-sm" dangerouslySetInnerHTML={createMarkup(value.description)} />  
                            </div>
                        </div>
                      
                    </div> 

                   
                    ))}
                </div>

                </div>
            </div>
        ) : <Loading/>}
    
    </>
    )
}

export default PortofolioPage;