import React, {useState, useEffect} from 'react';

const OptionEntry = (props) =>{
    const data = props.data
    // console.log(data)
    const handleDelete = () =>{
        props.deleteOptions(data.id)
    }

    return(
        <div className="mx-8 mt-8 grid grid-cols-3 grid-flow-col gap-20">  
            <div className="text-left text-base font-medium text-gray-500 uppercase tracking-wider " > {data.symbol} {data.date} {data.type}{data.strike} </div>
            <div className="text-left text-base font-medium text-gray-500 uppercase tracking-wider " > {data.long ? "Long" : "Short"} </div>
            <div className="text-left text-base font-medium text-gray-500 uppercase tracking-wider ml-8" > {data.price} </div>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete} > X </button>
        </div>
    )
}

export default OptionEntry;