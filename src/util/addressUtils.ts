"use server"
export type AddressSuggestions = {
    providedAddress: string
    suggestions: AddressSuggestion[]
}

export type AddressSuggestion = {
    coordinates: [number, number]
    formattedAddress: string
}

export type Address = string


export async function getValidAddress(address: string | string[] | undefined): Promise<AddressSuggestion | undefined> {
    if(typeof address !== "string") {
        return undefined;
    }

    try{
        return JSON.parse(address) as AddressSuggestion;
    }catch(err){
        console.log(err);
    }

    return undefined;
}

export async function getAddressSuggestionsResponse(address: Address): Promise<Response> {
    return await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=${process.env.GEOAPIFY_API_KEY}`)
}

export async function getAddressSuggestions(address: Address): Promise<AddressSuggestions> {
    const res: Response = await getAddressSuggestionsResponse(address);
    var data = await res.json();
    console.log(JSON.stringify(data));
    return parseAddressSuggestions(data, address);
}

function parseAddressSuggestions(data: any, address: Address): AddressSuggestions {
    var res: AddressSuggestions = {
        providedAddress: address,
        suggestions: []
    };

    for(var feature of data.features){
        var suggestion: AddressSuggestion = {
            coordinates: feature.geometry.coordinates,
            formattedAddress: feature.properties.formatted
        }
        res.suggestions.push(suggestion);
    }

    return res;
}