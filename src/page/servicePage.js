import { Suspense, lazy, useEffect, useState } from "react";
import Portfolio from "../compoments/portofolio";
import CallApi from "../api/Api";
import SkeletonPortofolio from "../compoments/skeleton";
import { scrollToTop } from "../compoments/htmlTag";


const ServicesPage = () => {
    const [project, setProject] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      CallApi('service', 'GET')
      .then( ressponse => {
        scrollToTop();
        if(ressponse.status === true) {
            setLoading(false);
            setProject(ressponse.results.project)
        } else {
            alert('Error Page');
        }
      })

    }, []);

    return (
        <div>
            

            <div className="container mx-auto">
            <div className="relative h-72 rounded-xl mb-24 my-20">
                <div className="bg-black relative  rounded-xl">
                    <img src="https://images.unsplash.com/photo-1665686308827-eb62e4f6604d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D=" alt="sacsa" loading="lazy" className="opacity-80 w-full object-cover h-96 aspect-video rounded-xl"/>
               </div>
               <div className="absolute top-0 bottom-0 left-0 right-0 my-0 mx-0 space-y-2 text-white text-center h-auto flex flex-col items-center justify-center">
               <h1 className="text-xl font-semibold ">Our Services</h1>
                <h2 className="xl:text-4xl lg:text-4xl text-lg font-bold ">
                    Tingkatkan Acara Anda, Ubah Pengalaman Anda
                </h2>
               </div>
            </div>
            <div className="py-24">
                <div className="text-center space-y-5 ">
                    <h1 className="text-xl font-semibold text-blue-500 ">Our Services</h1>
                    <h2 className="xl:text-4xl lg:text-4xl text-lg font-bold ">
                        Tingkatkan Acara Anda, Ubah Pengalaman Anda
                    </h2>

                    <div className="">
                        <p className="xl:px-32 lg:px-32 px-5 xl:mx-10 lg:mx-10 mx-0 mb-5 font-base py-5" >
                        Portofolio kami adalah bukti semangat, kreativitas, dan dedikasi yang kami bawa ke setiap acara.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap xl:grid lg:grid md:grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2  xl:gap-5 lg:gap-5 gap-8 items-center place-content-center">
                            <div>
                                <img className="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fFJlY3J1aXRtZW50JTIwRXZlbnR8ZW58MHx8MHx8fDA%3D" alt="" />
                                <div className="my-4 space-y-4">
                                <h1 className="font-semibold">Recruitment Event</h1>
                                <p className="text-slate-600">Organized socialization of the contents of my plate and parenting</p>
                                </div>
                            </div>

                            <div>
                                <img className="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q29ycG9yYXRlJTIwSGlyaW5nJTIwUHJvZ3JhbXxl bnwwfHwwfHx8MA%3D%3D" alt="" />
                                <div className="my-4 space-y-4">
                                <h1 className="font-semibold">Corporate Hiring Program</h1>
                                <p className="text-slate-600">Organized socialization of the contents of my plate and parenting</p>
                                </div>
                            </div>

                            <div>
                                <img className="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fERpZ2l0YWwlMjBTZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
                                <div className="my-4 space-y-4">
                                <h1 className="font-semibold">Digital Services</h1>
                                <p className="text-slate-600">Organized socialization of the contents of my plate and parenting</p>
                                </div>
                            </div>

                            <div>
                                <img className="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TXVzaWMlMjBjb25jZXJ0fGVufDB8fDB8fHww" alt="" />
                                <div className="my-4 space-y-4">
                                <h1 className="font-semibold">Music concert</h1>
                                <p className="text-slate-600">Organized socialization of the contents of my plate and parenting</p>
                                </div>
                            </div>

                            <div>
                                <img className="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGh5YnJpZCUyMGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
                                <div className="my-4 space-y-4">
                                <h1 className="font-semibold">Offline, online, or hybrid events (combination of online & offline)</h1>
                                <p className="text-slate-600">Organized socialization of the contents of my plate and parenting</p>
                                </div>
                            </div>

                            <div>
                                <img className="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEdhdGhlcmluZ3MlMjBldmVudHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                                <div className="my-4 space-y-4">
                                <h1 className="font-semibold">Gathering</h1>
                                <p className="text-slate-600">Organized socialization of the contents of my plate and parenting</p>
                                </div>
                            </div>
                
                </div>

                 <div className="mx-auto text-center my-10">
                    <button className="bg-blue-500 px-10 py-3 rounded-full text-white font-semibold shadow-lg border-white">Lets Create Your Event </button>
                </div>
                
            </div>
            </div>
        </div>
    )
}

export default ServicesPage;