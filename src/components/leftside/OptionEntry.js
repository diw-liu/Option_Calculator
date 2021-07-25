import React, {useState, useEffect} from 'react';

const OptionEntry = (props) =>{
    const data = props.data
    // console.log(data)
    const handleDelete = () =>{
        props.deleteOptions(data.id)
    }

    return(
       <div className="grid grid-cols-2 grid-flow-col gap-2">  
           <div > {data.symbol} {data.date} {data.type}{data.strike} </div>
           <div > {data.long ? "Long" : "Short"} </div>
           <div > {data.price} </div>
           <div onClick={handleDelete} > X </div>
       </div>
    )
}

export default OptionEntry;