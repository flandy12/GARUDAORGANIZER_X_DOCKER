import { Link } from "react-router-dom";

const Whatsapp = (props) => {
    return (
        <div className="fixed bottom-5 right-10 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
           
            <Link to={`https://wa.me/${props.data}?text=Hai%20Garuda%20Organizer,%20saya%20ingin%20bertanya%20tentang...%20`} target="_blank" className="whatsapp-button ">
            {/* <img src="/images/icon/Whatsapp.png" alt="" className="w-full h-full"/> */}
            <svg data-bbox="0.3 0.396 45.314 45.304" viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg" data-type="color" className="w-10 h-10">
                <g>
                    <path d="M23.4.4A22 22 0 0 0 1.2 22.1v.3a25.7 25.7 0 0 0 3.1 11.5l-4 11.8 12.4-3.9a22.3 22.3 0 0 0 30.1-8.9 21.9 21.9 0 0 0-8.3-29.8A22.5 22.5 0 0 0 23.4.4zm11.1 30.5a5.8 5.8 0 0 1-4 2.4c-1 .2-1 .9-6.8-1.6s-9-8.4-9.3-8.9a11.2 11.2 0 0 1-2.2-5.9 6.9 6.9 0 0 1 2.2-4.6 2.4 2.4 0 0 1 1.6-.7h1.1c.3 0 .7 0 1.2 1.2l1.5 4.1c.3.5.3.8 0 1a1.6 1.6 0 0 1-.5 1.1l-.9.8c-.3.3-.6.6-.3 1.2a37.9 37.9 0 0 0 3 4 22.1 22.1 0 0 0 4.5 3c.6.3.9.3 1.3-.1l1.9-2.2c.2-.6.7-.4 1.3-.1l3.7 1.8 1.1.8a8.4 8.4 0 0 1-.4 2.7z"  fill="#ffffff" data-color="1" className=""></path>
                </g>
            </svg>
            </Link>
        </div>
    )
}

export default Whatsapp;