import client from "./client"
import follow from "./follow"

export default function test(){
    const host = process.env.NEXT_PUBLIC_METADATA_SERVER;
    const root = process.env.NEXT_PUBLIC_METADATA_ROOT;

    follow(client, host+root, [
        {rel:'cakes', params:{size:2}}]
    ).then(response=>{
        console.log(response.entity._embedded.cakes.length);
    })

}