import React from "react";
import { useUsersQuery } from '../generated/graphql';
import {useProtectedQuery} from '../generated/graphql'
import { useFilesQuery } from '../generated/graphql';



interface Props {

}

const Home: React.FC<Props> = props => {
    const {data: protectedData, error: protectedError} = useProtectedQuery({fetchPolicy: "network-only"});
    const {data: FileData, error: filesError} = useFilesQuery({fetchPolicy : "network-only"});

    //console.log(protectedData, protectedError?.message)

   
    const {data, loading, error} = useUsersQuery({fetchPolicy: "network-only"});
    if(error) return <h1>{error.message}</h1>
    if(loading) return <h1>...loading</h1>


    return <div>
        {JSON.stringify(data?.users)}
        <div>
            {FileData && FileData.files.map(file => <img src={file.url} alt="someVal"/>)}
        </div>
        </div>
};


export default Home