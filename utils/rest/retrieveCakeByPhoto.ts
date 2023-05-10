import client from "./client";
import follow from "./follow"

/*
* return a cake or a {}
* */
export default function retrieveCakeByPhoto(photo){
    const host = process.env.NEXT_PUBLIC_METADATA_SERVER;
    const root = process.env.NEXT_PUBLIC_METADATA_ROOT;

    return follow(client, host+root, ['cakes','search',
            {rel:'retrieveByPhoto', params:{photo:photo}}
        ]
    ).then(response=> {
        let arr = response.entity._embedded.cakes;
        if(arr.length == 0 )
        {
            return null;
        }else if(arr.length==1){
            return arr[0];
        }else{
            //Exception: redundant cakes
            return arr[0];
        }
    })
}