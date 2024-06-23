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