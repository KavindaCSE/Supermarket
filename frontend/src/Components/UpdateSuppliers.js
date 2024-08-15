import { useParams } from "react-router-dom";
import UpdateSupplier from "./UpdateSupplier";

function UpdateSuppliers(){
    const {id} = useParams()
    return(
        <UpdateSupplier id = {id}/>
    )
}

export default UpdateSuppliers;