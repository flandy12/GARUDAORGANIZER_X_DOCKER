import { useEffect, useState } from "react";
import CallApi from "../api/Api";
import { Loading } from "../compoments/loading";
import SEO from "../compoments/seo";

const ContactUs = () => {
  const [loading, setLoading] = useState (true);
  const [onSubmitBtn , setOnSubmitBtn] = useState(false);
  const [contactUsInformation , setContactUsInformation] = useState(false)
  useEffect(() => {
    CallApi('contact-us-information', 'GET', {
      headers: {
        'Accept': 'application/json',
        'Authorization' : `Bearer ${process.env.REACT_APP_URL_API_KEY}`
      },
    })
    .then(ressponse => {
       if(ressponse.success === true) {
            setLoading(false);
            setContactUsInformation(ressponse.results)
       } else {
        alert('Error Page');
       }
    })
}, [])

const  handleSubmit = (e) =>{
    let elementError = document.querySelectorAll('.error_text');
    for (let index = 0; index < elementError.length; index++) {
        elementError[index].textContent = '';
    }
    
    e.preventDefault();
    setOnSubmitBtn(true);
    let formdata = new FormData();
    formdata.append('full_name', e.target.full_name.value);
    formdata.append('email', e.target.email.value);
    formdata.append('phone_number', e.target.phone_number.value);
    formdata.append('company_name', e.target.company_name.value);
    formdata.append('body_message', e.target.body_message.value);

    CallApi('contact-us/send', 'POST', {
      headers: {
        'Accept': 'application/json',
      },
      body : formdata
    }).then(ress => {
        if(ress.success === true) {
            alert(ress.title);
            setOnSubmitBtn(false);
            console.log(ress);
        } else {
            Object.entries(ress.errors).forEach((key, value) => {
                let element = document.getElementById(`${key[0]}_error`);
                if (element) element.textContent = key[1][0];
            });
            setOnSubmitBtn(false);
            console.log(ress);
        }
    })

  }

    return (
      <>
        <SEO
          title="Hubungi Garuda Organizer | Konsultasi Event"
          meta_description="Konsultasikan kebutuhan MICE, corporate event, recruitment event, atau digital event Anda bersama tim Garuda Organizer di Jakarta."
          meta_keywords="kontak Garuda Organizer, konsultasi event Jakarta, jasa EO Jakarta, konsultasi MICE"
          canonical="/contact"
          og_image="/images/asset/contact.jpg"
          schema={{
            "@type": "ContactPage",
            name: "Hubungi Garuda Organizer",
            url: "https://www.garudaorganizer.com/contact",
            mainEntity: {
              "@id": "https://www.garudaorganizer.com/#organization",
            },
          }}
        />
        <div className="container mx-auto xl:px-5 lg:px-5 md:px-5 px-5">
            <div className="justify-center items-stretch bg-neutral-700 flex flex-col">
                  <div className="bg-white flex w-full flex-col justify-center items-stretch px-px max-md:max-w-full">
                    <div className="bg-white flex flex-col items-stretch max-md:max-w-full">
                      <div className="self-center w-full my-24 max-md:max-w-full max-md:mt-10 ">
                        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                          <div className="flex flex-col items-stretch w-[42%] max-md:w-full max-md:ml-0">
                            <div className="flex flex-col items-stretch mt-3.5 px-5 max-md:mt-10">
                              <h1 className="justify-center text-neutral-900 xl:text-5xl lg:text-3xl md:text-3xl text-xl font-bold xl:leading-[53px] lg:leading-[39px] leading-[39px] max-md:text-4xl">
                              Contact Our Team
                              </h1>
                              <div className="justify-center text-neutral-500 text-base leading-7 mt-9">
                              Don't hesitate to contact our team and share your ideas,
                                <br />
                                questions, or needs. We're here to help make any challenges you face a reality. Together, let's find the right solution to meet your needs!
                              </div>
                              <div className="justify-center text-neutral-900 text-lg font-bold leading-5 mt-10">
                                Contact us via:
                              </div>
                              <div className="flex items-stretch justify-between gap-2.5 mt-5">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf2e8d5aa063346244ee958662cf702c38f3f950ad9920d16c7c497c9a771d63?"
                                  className="aspect-[0.75] object-contain object-center w-[21px] justify-center items-center overflow-hidden shrink-0 max-w-full"
                                  alt="icon-email"
                                />
                                <div className="justify-center text-neutral-500 text-lg leading-5 self-center grow shrink basis-auto my-auto">
                                {contactUsInformation.to_email} 
                                </div>
                              </div>
                          
                            </div>
                          </div>
                          <div className="flex flex-col items-stretch w-[58%] ml-5 max-md:w-full max-md:ml-0">
                            <form className="border shadow-sm bg-white flex grow flex-col w-full pt-12 px-12 rounded-xl border-solid border-zinc-100 max-md:max-w-full max-md:mt-10 max-md:px-5"  onSubmit={handleSubmit}>
                              <div className="self-stretch xl:flex lg:block md:block justify-between xl:space-y-0 lg:space-y-5 space-y-5 gap-5 items-start max-md:max-w-full max-md:flex-wrap">
                                <div className="flex grow basis-[0%] flex-col items-stretch">
                                  <div className="justify-center text-neutral-900 text-sm font-semibold leading-4 tracking-wider uppercase">
                                    Full Name
                                  </div>
                                  <input className="justify-center text-neutral-500 text-base whitespace-nowrap border shadow-sm bg-white mt-4 pl-5 pr-16 py-5 rounded-lg border-solid border-zinc-100 items-start max-md:pr-5" type="text"  name="full_name" />
                                  <p id="full_name_error" className="mt-2 text-red-500 dark:text-red-500 error_text"></p>
                                </div>
                                <div className="self-stretch flex grow basis-[0%] flex-col items-stretch">
                                  <div className="justify-center text-neutral-900 text-sm font-semibold leading-4 tracking-wider uppercase">
                                    Email Address
                                  </div>
                                  <input className="justify-center text-neutral-500 text-base whitespace-nowrap border shadow-sm bg-white mt-4 pl-5 pr-16 py-5 rounded-lg border-solid border-zinc-100 items-start max-md:pr-5" type="email"  name="email"/>
                                  <p id="email_error" className="mt-2 text-red-500 dark:text-red-500 error_text"></p>
                                </div>
                              </div>
                              <div className="self-stretch xl:flex lg:block md:block items-stretch justify-between gap-5 mt-8 max-md:max-w-full max-md:flex-wrap  xl:space-y-0 lg:space-y-5 space-y-5">
                                <div className="flex grow basis-[0%] flex-col items-stretch xl:space-y-5 lg:space-y-5 space-y-5">
                                  <div className="justify-center text-neutral-900 text-sm font-semibold leading-4 tracking-wider uppercase">
                                    Phone
                                  </div>
                                  <input className="justify-center text-neutral-500 text-base whitespace-nowrap border shadow-sm bg-white mt-4 pl-5 pr-16 py-5 rounded-lg border-solid border-zinc-100 items-start max-md:pr-5" type="text" name="phone_number"/>
                                  <p id="phone_number_error" className="mt-2 text-red-500 dark:text-red-500 error_text"></p>
                                </div>
                                <div className="flex grow basis-[0%] flex-col items-stretch xl:space-y-5 lg:space-y-5 space-y-5">
                                  <div className="justify-center text-neutral-900 text-sm font-semibold leading-4 tracking-wider uppercase">
                                    Company 
                                  </div>
                                  <input className="justify-center text-neutral-500 text-base whitespace-nowrap border shadow-sm bg-white mt-4 pl-5 pr-16 py-5 rounded-lg border-solid border-zinc-100 items-start max-md:pr-5" type="text" name="company_name" />
                                  <p id="company_name_error" className="mt-2 text-red-500 dark:text-red-500 error_text"></p>
                                </div>
                              </div>
                              <div className="justify-center text-neutral-900 text-sm font-semibold leading-4 tracking-wider uppercase self-stretch mt-8 max-md:max-w-full">
                                Leave us a message
                              </div>
                              <textarea className="border shadow-sm bg-white self-stretch flex shrink-0 h-[140px] flex-col mt-4 rounded-lg border-solid border-zinc-100 max-md:max-w-full p-5" name="body_message"></textarea>
                              <p id="body_message_error" className="mt-2 text-red-500 dark:text-red-500 error_text"></p>

                              {onSubmitBtn !== true ? (
                                <button className="justify-center text-white text-center text-base font-bold leading-5 whitespace-nowrap items-stretch bg-blue-500  px-7 rounded-lg self-start max-md:px-5 py-5 my-8" type="submit">
                                Send Message
                                </button>
                              ) :  <button disabled="" type="button" className="justify-center text-white text-center text-base font-bold leading-5 whitespace-nowrap items-stretch bg-blue-500  px-7 rounded-lg self-start max-md:px-5 py-5 my-8">
                              <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                              </svg>
                              Loading...
                            </button>}

                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
        </div>
      </>
    )
}

export default ContactUs;
