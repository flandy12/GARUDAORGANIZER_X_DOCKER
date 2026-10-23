async function CallApi(url, method, data = {}) {
    // 1. Create a new instance of the API client (you can use one shared instance for all requests)

    const GetUrl = process.env.REACT_APP_URL_API;

    const GetKey = process.env.REACT_APP_URL_API_KEY;

    let Headers = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Authorization' : `Bearer ${GetKey}`
        },
    }

    Object.keys(data).map((value, key) => {
        Headers[value] = data[value]
    });

    const ressponse = await fetch(`${GetUrl}${url}`, Headers);
    return ressponse.json();
     
}

export default CallApi;