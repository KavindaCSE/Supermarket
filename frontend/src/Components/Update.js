import React from "react";
import { useParams } from "react-router-dom";
import Updateproduct from "./UpdateProduct";

function Update(){
    let {id} = useParams()
    return(
        <Updateproduct id = {id}/>
    )
}

export default Update;