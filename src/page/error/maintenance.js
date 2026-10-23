const MaintenancePage = () => {
    return (
        <>
            <div className="flex flex-col justify-center py-20  max-md:px-5">
                <picture>
                    <source media="(min-width: 650px)" srcSet={'/images/asset/maintenance.png'} />
                    <img src={'/images/asset/maintenance.png'} alt="maintenance-asset" className="m-auto"/>
                </picture>
                <div className="md:max-w-[auto] xl:w-[610px] lg:w-[610px] text-center mx-auto mt-5 space-y-3 xl:px-0 lg:px-0 max-md:px-5 md:px-20">
                    <h1 className="font-bold text-2xl text-blue-500">Site Under Maintenance</h1>
                    <p>Apologies for the inconvenience. Our website is currently undergoing maintenance to enhance user experience. We will be back online shortly. Thank you for your patience and understanding.</p>
                </div>
            </div>
        </>
    )
}

export default MaintenancePage;