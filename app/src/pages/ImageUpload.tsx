import React, {useState} from "react";
import Dropzone from "react-dropzone";
import { Button } from "@material-ui/core";
import { useUploadMutation } from "../generated/graphql";
import axios from "axios";


interface Props {

}



const ImageUpload: React.FC<Props> = props => {
    const [file, setFile] = useState<null | File>(null)
    const [upload, { data, loading, error }] = useUploadMutation();

    const onDropHandler = (files: File[]) => {
        setFile(files[0]);
    }

    const onSubmitHandler = async () => {
        if(file){
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "mbnbzzq1")
            try{
                const cloudResponse = await axios.post(`https://api.cloudinary.com/v1_1/ddterpuu4/upload`, formData);
                console.log(typeof cloudResponse.data.url, typeof cloudResponse.data.bytes.toString(), typeof cloudResponse.data.format)
                const {data} = await upload({
                    variables: {
                        url: cloudResponse.data.url, 
                        bytes: cloudResponse.data.bytes.toString(), 
                        format: cloudResponse.data.format
                    }
                })
                console.log(data);
            } catch(err){
                console.log(err);
            }
        }
    }

    return(
        <div>
            <h1>ImageUpload</h1>
            <Dropzone onDrop={acceptedFiles => onDropHandler(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()} style={{background: "lightgray", width:"250px", height:"250px", border: "1px dotted red"}}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
            </Dropzone>
            <Button variant="outlined" color="secondary" type="submit" onClick={onSubmitHandler}>Submit ImageUpload</Button>
        </div>
    )
};

export default ImageUpload