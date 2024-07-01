"use server"
import {redirect} from "next/navigation";

export type URLSearchParamsType= { [key: string]: string | string[] | undefined };

export async function route(path: string, newParams: URLSearchParamsType = {}, existingParams: URLSearchParamsType = {}) {
    var combinedParams: URLSearchParamsType = existingParams ? existingParams : {};
    for (var key of Object.keys(newParams)) {
        combinedParams[key] = newParams[key];
    }

    var queryUrl = await convertParamsToString(combinedParams);

    if(queryUrl){
        redirect(`${path}?${queryUrl}`);
    }else{
        redirect(path);
    }
}

export async function convertParamsToString(params: URLSearchParamsType): Promise<string> {
    return Object.keys(params).map(function(key: string) {
        switch(typeof params[key]){
            case "string": return encodeURIComponent(key) + '=' + encodeURIComponent(params[key] as string);
            case "object": return encodeURIComponent(key) + '=' + (params[key] as string[]).map((v) => encodeURIComponent(v)).join(",");
            default: return undefined;
        }
    }).filter(function(str: any) {
        return str
    }).join('&')
}