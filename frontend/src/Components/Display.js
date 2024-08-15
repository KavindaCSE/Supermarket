import React from "react";
import Table from './Table';

function Display(props){
    return(
        <>
        <Table user={props.user}/>
        </>
    )
}

export default Display