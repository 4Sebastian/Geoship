"use server"
export async function getValidAddress(address: string | string[] | undefined): Promise<any | undefined> {
    if(typeof address !== "string") {
        return undefined;
    }

    try{
        return JSON.parse(address);
    }catch(err){
        console.log(err);
    }

    return address;
}

export async function getAddressSuggestionsResponse(address: string): Promise<Response> {
    return await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=${process.env.GEOAPIFY_API_KEY}`)
}

export async function getAddressSuggestions(address: string): Promise<any> {
    const res: Response = await getAddressSuggestionsResponse(address);
    var data = await res.json();
    data.providedAddress = address;
    return data;
}