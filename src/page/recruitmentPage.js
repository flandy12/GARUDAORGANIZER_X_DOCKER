import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallApi from "../api/Api";
import { scrollToTop, createMarkup } from "../compoments/htmlTag";
import { Loading } from "../compoments/loading";
import SEO from "../compoments/seo";

const RecruitmentPage = () => {
    const params = window.location.pathname;
    const [loading, setLoading] = useState(true);
    const [banner, setBanner] = useState('');
    const [wording, setWording] = useState('');
    const [banner_description, setBannerDescription] = useState('');
    const [other_images , setOtherImages] = useState([]);
    const [image , setImage] = useState([]);
    const [title, setTitle] = useState('');
    const [hover_element, setHoverElement] = useState('');
    useEffect(() => {
        CallApi(`service?url=${params.replace('/','')}`, 'GET')
        .then(ressponse => {
            scrollToTop();
            if(ressponse.success === true) {
                console.log(ressponse);
                setLoading(false);
                setBanner(ressponse.results ? ressponse.results.banner : '');
                setWording(ressponse.results ? ressponse.results.wording : '');
                setBannerDescription(ressponse.results ? ressponse.results.description : '');
                setOtherImages(ressponse.results ? ressponse.results.other_images : '');
                setImage(ressponse.results ? ressponse.results.image : '');
                setTitle(ressponse.results ? ressponse.results.title : '');
            } else {
                alert('error');
            
            }
        })
    },[])

    const MouseHover = (e) => {
        e.preventDefault();
        setHoverElement(e.target.getAttribute('data-target'));
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
        {
             loading === false ? (
                <div>
                    <div className="flex overflow-hidden relative flex-col justify-center items-center self-stretch px-16 py-12 w-full min-h-[500px] max-md:px-5 max-md:max-w-full bg-black">
                    <picture>
                    <source srcSet={banner ? banner : ''} type="image/webp"/>
                    <img className="object-cover absolute inset-0 size-full opacity-50" src={banner ? banner : ''} alt="Recruitment Event" loading="lazy" />
                </picture> 
                    <div className="flex relative flex-col mt-40 mb-28 max-w-full w-[726px] max-md:my-10">
                    <div className="self-center text-6xl font-bold text-white max-md:max-w-full max-md:text-4xl">
                        Recruitment Event
                    </div>
                    <div className="mt-10 text-base text-center w-[726px] text-white text-opacity-80 max-md:mt-10 max-md:max-w-full" dangerouslySetInnerHTML={createMarkup(banner_description)} />
                    </div>
                    </div>
                    <div className="container mx-auto">
                        <div className="flex flex-col items-center pb-12 bg-white px-8">
                            <div className="mt-12 w-full max-md:mt-10 max-md:max-w-full">
                                <div className="flex max-md:flex-col-reverse gap-5 ">
                                    <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full">
                                        <div className="flex flex-col grow place-content-center max-md:max-w-full">
                                        <span className={`justify-center text-center self-start px-5 py-3 font-bold text-white whitespace-nowrap rounded-3xl border border-blue-300 border-solid capitalize bg-cs ${title === 'null' ? 'hidden' : ''}`}>
                                        {title}
                                        </span>
                                        <div className="mt-8 text-base text-black max-md:max-w-full" dangerouslySetInnerHTML={createMarkup(wording)} />
                                        </div>
                                    </div>

                                    <div className="flex flex-col ml-5 w-[54%] max-md:ml-0 max-md:w-full">
                                    
                                    <picture >
                                        <source srcSet={`${image} `} type="image/webp"/>
                                        <img className={`w-full object-cover rounded aspect-[1.61] max-md:max-w-full`} src={`${process.env.REACT_APP_URL_IMG}${image} `} alt="Recruitment Event" loading="lazy"/>
                                    </picture> 
                                </div>
                                </div>
                            </div>
                            <div className="w-full max-md:mt-10 max-md:max-w-full">
                                <div className="my-8 text-2xl font-semibold  text-blue-500 uppercase max-md:mt-10 max-md:max-w-full">
                                    {other_images.length > 0 ? (<h1>Project</h1>) : ''}
                                </div>
                                <div className="flex justify-between gap-5 max-md:flex-col max-md:gap-0">
                                    <div className="flex max-md:flex-col justify-between gap-5 w-full">
                                            {other_images.length > 0 ? (
                                                other_images.map((value,keys) => (
                                                    <div className={`relative rounded-lg overflow-hidden cursor-pointer ${hover_element === 'element-'+keys ? 'bg-black ' : ''} `} onMouseEnter={MouseHover} onTouchStart={MouseHover} key={keys}>
                                                    <picture >
                                                        <source srcSet={`${value.image} `} type="image/webp"/>
                                                        <img className={`h-full object-cover ${hover_element === 'element-'+keys ? 'opacity-55' : ''} `} src={`${value.image} `} alt="Recruitment Event" loading="lazy" data-target={`element-${keys}`}/>
                                                    </picture> 
                                                    <div className={`absolute bottom-5 left-4 text-white ${hover_element === 'element-'+keys  ? ' ' : 'hidden'}`}>
                                                        <div className="font-semibold text-base" dangerouslySetInnerHTML={createMarkup(value.title.replace('-', "<br>" ))} />
                                                    </div>
                                                </div>
                                                ))
                                            ) : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <Loading/>
        }
        </>

    );
}

export default RecruitmentPage;
