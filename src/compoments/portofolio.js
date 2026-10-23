import { Link } from "react-router-dom"
import {createMarkup} from "./htmlTag"

const Portfolio = (props) => {
    
    const VideoPlay = () => {
        return (
            <div className="grid grid-cols-2 text-left bg-white border border-gray-200 rounded shadow dark:bg-gray-800 z-gray-700 ">
            <div>
                <iframe width="575" className="rounded rounded-r-none" height="323" src="https://www.youtube.com/embed/PDtPKKiB7qk" title="Asia Channel Summit 2023 - VERTIV x EVENTIFY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
            </div>

            <div className="py-6">
                <Link to="#">
                    <h5 className="mb-2 text-3xl font-semibold tracking-tight text-gray-900 mr-5">Vertiv Co Ltd Singapore Asia Channel Summit 2023</h5>
                </Link>
                <div className="mt-4">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Client : Vertiv Co Ltd
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Event Category : International
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Venue : Grand Hyatt, Nusa Dua, Bali
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Total Participant : 500 Pax
                    </p>
                </div>
             </div>
    </div>
        )
    }

    const Photos = () => {
        return (
            <div className={`bg-white border border-gray-200 relative gap-10 ${props.data === true ? ' xl:w-96 lg:w-72 md:w-fit' : ''} text-left p-3 rounded-2xl `}>
                <div  className="">
                    <img className="rounded-xl border w-full aspect-video " src={`${props.data_image}`} alt={`${props.data_name}`}/>
                </div>
                <div className="xl:px-2 lg:px-2 md:px-2 py-5">
                    <Link tp="#">
                        <h5 className="mb-2 xl:text-xl lg:text-xl text-lg font-bold tracking-tight text-slate-700">{`${props.data_name}`}</h5>
                    </Link>
                    <div className="mb-3 font-normal text-gray-800">
                        <div dangerouslySetInnerHTML={createMarkup(props.data_description)} />  
                    </div>
                </div>

    
        </div>
        )
    }

    return (
        <Photos/>
    )
}

export default  Portfolio;